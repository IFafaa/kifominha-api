import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterClientDto } from "./dtos/register-client.dto";
import { ObjectId } from "typeorm";
import { AuthEmailDto } from "./dtos/auth-email.dto";
import { RegisterRestaurantDto } from "./dtos/register-restaurant.dto";
import { LoginDto } from "./dtos/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post("register/client")
  async registerClient(@Body() registerClientDto: RegisterClientDto) {
    return await this.authService.registerClient(registerClientDto);
  }

  @Post("register/restaurant")
  async registerRestaurant(
    @Body() registerRestaurantDto: RegisterRestaurantDto,
  ) {
    return await await this.authService.registerRestaurant(
      registerRestaurantDto,
    );
  }

  @Post("verify/client/email/:id")
  async authenticateClientEmail(
    @Param("id") id: ObjectId,
    @Body() authEmailDto: AuthEmailDto,
  ) {
    return await this.authService.authClientEmail(id, authEmailDto.code);
  }

  @Post("verify/restaurant/email/:id")
  async authenticateRestaurantEmail(
    @Param("id") id: ObjectId,
    @Body() authEmailDto: AuthEmailDto,
  ) {
    return await this.authService.authRestaurantEmail(id, authEmailDto.code);
  }
}
