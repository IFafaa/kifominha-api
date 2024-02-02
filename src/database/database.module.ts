import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { User } from "src/modules/user/entities/user.entity";

const DB = TypeOrmModule.forRoot({
  type: "mongodb",
  url: process.env.DB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [User, Restaurant],
  synchronize: true,
});

@Module({
  imports: [DB, TypeOrmModule.forFeature([User, Restaurant])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
