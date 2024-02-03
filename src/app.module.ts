import { DatabaseModule } from "./database/database.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthMiddleware } from "./common/middlewares/auth.middleware";
import { FoodModule } from "./modules/food/food.module";

@Module({
  imports: [DatabaseModule, UserModule, AuthModule,FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        "auth/login",
        "auth/register/user",
        "auth/register/restaurant",
        "auth/verify/user/email/:id",
        "auth/verify/restaurant/email/:id",
      )
      .forRoutes("*");
  }
}
