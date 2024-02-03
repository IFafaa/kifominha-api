import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { FoodService } from "./food.service";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CreateFoodDto } from "./dtos/create-food.dto";
import { Restaurant } from "../restaurant/entities/restaurant.entity";

@ApiTags("Comidas")
@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(
    @Body() body: CreateFoodDto,
    @Headers("client") restaurant: Restaurant,
  ) {
    return this.foodService.create(body, restaurant);
  }

  @Get()
  async findAll() {
    return await this.foodService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId) {
    return await this.foodService.findOneById(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: ObjectId,
    @Body() updateUserDto: Partial<User>,
  ) {
    return await this.foodService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId) {
    return await this.foodService.remove(id);
  }
}
