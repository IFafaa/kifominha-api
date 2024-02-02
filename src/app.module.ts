import { DatabaseModule } from "./database/database.module";
import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
// implements NestModule
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .exclude(
  //       "auth/login",
  //       "auth/user/data",
  //       "auth/user/address/:id",
  //       "auth/verify/send/email",
  //       "auth/verify/auth/email",
  //       "webhook/payment",
  //       "plan",
  //     )
  //     .forRoutes("*");
  // }
}
