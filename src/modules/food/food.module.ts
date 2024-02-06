import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { FirebaseService } from "src/common/services/firebase.service";

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController],
  providers: [FoodService, FirebaseService],
  exports: [FoodService],
})
export class FoodModule {}
