import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FoodService } from "./food.service";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "typeorm";
import { CreateFoodDto } from "./dtos/create-food.dto";
import { Restaurant } from "../restaurant/entities/restaurant.entity";
import { Food } from "./entities/food.entity";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Comidas")
@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @UploadedFile() file,
    @Body() food: CreateFoodDto,
    @Headers("user") restaurant: Restaurant,
  ) {
    return this.foodService.create({ ...food, image: file }, restaurant);
  }

  // @Get()
  // async findAll() {
  //   return await this.foodService.findAll();
  // }

  @Get()
  async findBy(@Query() params: Partial<Food>) {
    return await this.foodService.findBy(params);
  }

  @Get("by/restaurant/:id")
  async findByRestaurantId(@Param("id") restaurant_id: ObjectId) {
    return await this.foodService.findByRestaurantId(restaurant_id);
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId) {
    return await this.foodService.findOneById(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: ObjectId,
    @Body() updateFoodDto: Partial<Food>,
  ) {
    return await this.foodService.update(id, updateFoodDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId) {
    return await this.foodService.remove(id);
  }
}
