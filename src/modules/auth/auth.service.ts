import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterClientDto } from "./dtos/register-client.dto";
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
import { ClientService } from "../client/client.service";
import { Client } from "../client/entities/client.entity";
import { ENUM_USER_TYPE } from "src/common/enums/user-type.enum";
import { UploadService } from "../upload/upload.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly emailService: EmailService,
    private readonly restaurantService: RestaurantService,
    private readonly tokenService: TokenService,
    private readonly uploadService: UploadService,
  ) {}

  async registerClient(_client: RegisterClientDto) {
    try {
      if (
        await this.verifyIfWasRegistered({
          cpf: _client.cpf,
          cnpj: undefined,
          email: _client.email,
          phone: _client.phone,
        })
      ) {
        throw new BadRequestException({
          message: "Cliente ou restaurante já cadastrado. Tente fazer o login.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(_client.password, salt);

      const client: Omit<Client, "_id"> = {
        ..._client,
        auth: {
          email: {
            authenticated: false,
            code: null,
          },
        },
        password: hashedPassword,
      };
      const clientCreated = await this.clientService.create(client);
      await this.sendVerificationEmail(clientCreated);
      return {
        message: "Cliente cadastrado com sucesso!",
        data: {
          id: clientCreated._id,
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
          message: "Cliente ou restaurante já cadastrado. Tente fazer o login.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(_restaurant.password, salt);

      _restaurant.logo = await await this.uploadService.uploadImage(
        _restaurant.logo,
      );

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

  async authClientEmail(id: ObjectId, code: string) {
    try {
      const client = await this.clientService.findOneById(id);
      if (client.auth.email.authenticated) {
        throw new BadRequestException({
          message: "Esse cliente já teve o email verificado.",
        });
      }
      if (client.auth.email.code !== code) {
        throw new BadRequestException({
          message: "O código fornecido não confere com o enviado.",
        });
      }
      client.auth.email.code = "";
      client.auth.email.authenticated = true;

      const clientUpdated = await this.clientService.update(client._id, client);
      return {
        message: "Email verificado com sucesso.",
        data: {
          access_token:
            await this.tokenService.getTokenClient<Client>(clientUpdated),
        },
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
        data: {
          access_token:
            await this.tokenService.getTokenClient<Restaurant>(
              restaurantUpdated,
            ),
        },
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
        let typeUser: ENUM_USER_TYPE;
        if (client instanceof Client) typeUser = ENUM_USER_TYPE.client;
        if (client instanceof Restaurant) typeUser = ENUM_USER_TYPE.restaurant;
        throw new BadRequestException({
          message:
            "Você ainda não verificou seu e-mail, foi enviado um código para o seu e-mail para a verificação.",
          data: {
            id: client._id,
            type: typeUser,
          },
        });
      }
      return {
        data: {
          access_token: await this.tokenService.getTokenClient(client),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async sendAuthEmail(id: ObjectId) {
    try {
      const user =
        (await this.clientService.findOneById(id)) ||
        (await this.restaurantService.findOneById(id));
      await this.sendVerificationEmail(user);

      return {
        message: "E-mail enviado com sucesso!",
      };
    } catch (error) {}
  }

  async sendVerificationEmail(user: Client | Restaurant) {
    try {
      const verificationCode = CodeHelper.verificationCode();
      user.auth.email.code = verificationCode;
      if (user instanceof Client) {
        await this.clientService.update(user._id, user);
      }
      if (user instanceof Restaurant) {
        await this.restaurantService.update(user._id, user);
      }
      return await this.emailService.sendEmail(
        user.email,
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
      const clientIsRegistered = await this.clientService.clientIsRegistered({
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
      return clientIsRegistered || restaurantIsRegistered;
    } catch (error) {
      throw error;
    }
  }
}
