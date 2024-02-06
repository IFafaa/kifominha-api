import { DatabaseModule } from "./database/database.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClientModule } from "./modules/client/client.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthMiddleware } from "./common/middlewares/auth.middleware";
import { FoodModule } from "./modules/food/food.module";
import { CategoryModule } from "./modules/category/category.module";

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    AuthModule,
    FoodModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        "auth",
        "auth/login",
        "auth/register/client",
        "auth/register/restaurant",
        "auth/verify/client/email/:id",
        "auth/verify/restaurant/email/:id",
        "auth/send/email/:id",
        "category",
      )
      .forRoutes("*");
  }
}
