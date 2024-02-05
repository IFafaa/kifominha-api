import { Controller, Get, Param } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "typeorm";

@ApiTags("Restaurante")
@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // @Post()
  // async create(@Body() body: User) {
  //   return this.restaurantService.create(body);
  // }

  @Get()
  async findAll() {
    return await this.restaurantService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: ObjectId) {
    return await this.restaurantService.findOneById(id);
  }

  // @Put(":id")
  // async update(
  //   @Param("id") id: ObjectId,
  //   @Body() updateUserDto: Partial<User>,
  // ) {
  //   return await this.restaurantService.update(id, updateUserDto);
  // }

  // @Delete(":id")
  // async remove(@Param("id") id: ObjectId) {
  //   return await this.restaurantService.remove(+id);
  // }
}
