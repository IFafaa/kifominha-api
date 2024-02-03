import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { EmailService } from "src/common/services/email.service";
import { RestaurantModule } from "../restaurant/restaurant.module";
import { TokenService } from "src/common/services/token.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RestaurantModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, EmailService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}