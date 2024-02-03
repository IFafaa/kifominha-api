import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { User } from "../user/entities/user.entity";
import { EmailService } from "src/common/services/email.service";
import { verificationEmailTemplate } from "src/common/templates/verification-email.template";
import { CodeHelper } from "src/common/helpers/codes.helper";
import { ObjectId } from "typeorm";
import { RestaurantService } from "../restaurant/restaurant.service";
import { RegisterRestaurantDto } from "./dtos/register-restaurant.dto";
import { Restaurant } from "../restaurant/entities/restaurant.entity";
import { TokenService } from "src/common/services/token.service";
import { LoginDto } from "./dtos/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly restaurantService: RestaurantService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(_user: RegisterUserDto) {
    try {
      if (
        await this.verifyIfWasRegistered({
          cpf: _user.cpf,
          cnpj: undefined,
          email: _user.email,
          phone: _user.phone,
        })
      ) {
        throw new BadRequestException({
          message: "Usuário ou restaurante já cadastrado. Tente fazer o login.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(_user.password, salt);

      const user: Omit<User, "_id"> = {
        ..._user,
        auth: {
          email: {
            authenticated: false,
            code: null,
          },
        },
        password: hashedPassword,
      };
      const userCreated = await this.userService.create(user);
      await this.sendVerificationEmail(userCreated);
      return {
        message: "Usuário cadastrado com sucesso!",
        data: {
          id: userCreated._id,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async registerRestaurant(_restaurant: RegisterRestaurantDto) {
    try {
      if (
        await this.verifyIfWasRegistered({
          cpf: undefined,
          cnpj: _restaurant.cnpj,
          email: _restaurant.email,
          phone: _restaurant.phone,
        })
      ) {
        throw new BadRequestException({
          message: "Usuário ou restaurante já cadastrado. Tente fazer o login.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(_restaurant.password, salt);

      const restaurant: Omit<Restaurant, "_id"> = {
        ..._restaurant,
        auth: {
          email: {
            authenticated: false,
            code: null,
          },
        },
        password: hashedPassword,
      };
      const restaurantCreated = await this.restaurantService.create(restaurant);
      await this.sendVerificationEmail(restaurantCreated);
      return {
        message: "Restaurante cadastrado com sucesso!",
        data: {
          id: restaurantCreated._id,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async authUserEmail(id: ObjectId, code: string) {
    try {
      const user = await this.userService.findOneById(id);
      if (user.auth.email.authenticated) {
        throw new BadRequestException({
          message: "Esse usuário já teve o email verificado.",
        });
      }
      if (user.auth.email.code !== code) {
        throw new BadRequestException({
          message: "O código fornecido não confere com o enviado.",
        });
      }
      user.auth.email.code = "";
      user.auth.email.authenticated = true;

      const userUpdated = await this.userService.update(user._id, user);
      return {
        message: "Email verificado com sucesso.",
        data: await this.tokenService.getTokenClient<User>(userUpdated),
      };
    } catch (error) {
      throw error;
    }
  }

  async authRestaurantEmail(id: ObjectId, code: string) {
    try {
      const restaurant = await this.restaurantService.findOneById(id);
      if (restaurant.auth.email.authenticated) {
        throw new BadRequestException({
          message: "Esse restaurante já teve o email verificado.",
        });
      }
      if (restaurant.auth.email.code !== code) {
        throw new BadRequestException({
          message: "O código fornecido não confere com o enviado.",
        });
      }
      restaurant.auth.email.code = "";
      restaurant.auth.email.authenticated = true;

      const restaurantUpdated = await this.restaurantService.update(
        restaurant._id,
        restaurant,
      );
      return {
        message: "Email verificado com sucesso.",
        data: await this.tokenService.getTokenClient<Restaurant>(
          restaurantUpdated,
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const client = await this.verifyIfWasRegistered({
        email: loginDto.email,
      });

      if (
        client === null ||
        !(await bcrypt.compare(loginDto.password, client.password))
      ) {
        throw new UnauthorizedException({
          message: "Verifique seu e-mail ou senha e tente novamente.",
        });
      }

      if (!client.auth.email.authenticated) {
        await this.sendVerificationEmail(client);
        throw new BadRequestException({
          message:
            "Você ainda não verificou seu e-mail, foi enviado um código para o seu e-mail para a verificação.",
        });
      }
      return {
        data: await this.tokenService.getTokenClient(client),
      };
    } catch (error) {
      throw error;
    }
  }

  async sendVerificationEmail(client: User | Restaurant) {
    try {
      const verificationCode = CodeHelper.verificationCode();
      client.auth.email.code = verificationCode;
      if (client instanceof User) {
        await this.userService.update(client._id, client);
      }
      if (client instanceof Restaurant) {
        await this.restaurantService.update(client._id, client);
      }
      return await this.emailService.sendEmail(
        client.email,
        "Confirme seu endereço de e-mail - Código de Verificação",
        verificationEmailTemplate(verificationCode),
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyIfWasRegistered(options: {
    cpf?: string;
    cnpj?: string;
    email?: string;
    phone?: string;
  }) {
    try {
      const userIsRegistered = await this.userService.userIsRegistered({
        email: options.email,
        cpf: options.cpf,
        phone: options.phone,
      });
      const restaurantIsRegistered =
        await this.restaurantService.restaurantIsRegistered({
          email: options.email,
          cnpj: options.cnpj,
          phone: options.phone,
        });
      return userIsRegistered || restaurantIsRegistered;
    } catch (error) {
      throw error;
    }
  }
}
