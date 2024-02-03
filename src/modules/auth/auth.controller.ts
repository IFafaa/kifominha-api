import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
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

  @Post("register/user")
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.registerUser(registerUserDto);
  }

  @Post("register/restaurant")
  async registerRestaurant(
    @Body() registerRestaurantDto: RegisterRestaurantDto,
  ) {
    return await await this.authService.registerRestaurant(
      registerRestaurantDto,
    );
  }

  @Post("verify/user/email/:id")
  async authenticateUserEmail(
    @Param("id") id: ObjectId,
    @Body() authEmailDto: AuthEmailDto,
  ) {
    return await this.authService.authUserEmail(id, authEmailDto.code);
  }

  @Post("verify/restaurant/email/:id")
  async authenticateRestaurantEmail(
    @Param("id") id: ObjectId,
    @Body() authEmailDto: AuthEmailDto,
  ) {
    return await this.authService.authRestaurantEmail(id, authEmailDto.code);
  }
}
