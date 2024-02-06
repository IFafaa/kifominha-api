import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { UploadModule } from "../upload/upload.module";

@Module({
  imports: [DatabaseModule, UploadModule],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
