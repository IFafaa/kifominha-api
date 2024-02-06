import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { DatabaseModule } from "src/database/database.module";
import { FoodModule } from "../food/food.module";

@Module({
  imports: [DatabaseModule, FoodModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
