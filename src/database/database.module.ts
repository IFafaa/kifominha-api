import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Food } from "src/modules/food/entities/food.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";
import { User } from "src/modules/user/entities/user.entity";

const DB = TypeOrmModule.forRoot({
  type: "mongodb",
  url: process.env.DB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [User, Restaurant, Food],
  synchronize: true,
});

@Module({
  imports: [DB, TypeOrmModule.forFeature([User, Restaurant, Food])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
