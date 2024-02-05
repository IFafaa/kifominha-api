import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/modules/category/entities/category.entity";
import { Client } from "src/modules/client/entities/client.entity";
import { Food } from "src/modules/food/entities/food.entity";
import { Restaurant } from "src/modules/restaurant/entities/restaurant.entity";

const DB = TypeOrmModule.forRoot({
  type: "mongodb",
  url: process.env.DB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [Client, Restaurant, Food, Category],
  synchronize: true,
});

@Module({
  imports: [DB, TypeOrmModule.forFeature([Client, Restaurant, Food, Category])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
