import { DatabaseModule } from "./database/database.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClientModule } from "./modules/client/client.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthMiddleware } from "./common/middlewares/auth.middleware";
import { FoodModule } from "./modules/food/food.module";

@Module({
  imports: [DatabaseModule, ClientModule, AuthModule, FoodModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        "auth/login",
        "auth/register/client",
        "auth/register/restaurant",
        "auth/verify/client/email/:id",
        "auth/verify/restaurant/email/:id",
      )
      .forRoutes("*");
  }
}
