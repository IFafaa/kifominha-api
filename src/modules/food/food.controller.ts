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
} from "@nestjs/common";
import { FoodService } from "./food.service";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "typeorm";
import { CreateFoodDto } from "./dtos/create-food.dto";
import { Restaurant } from "../restaurant/entities/restaurant.entity";
import { Food } from "./entities/food.entity";

@ApiTags("Comidas")
@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(
    @Body() body: CreateFoodDto,
    @Headers("user") restaurant: Restaurant,
  ) {
    return this.foodService.create(body, restaurant);
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
