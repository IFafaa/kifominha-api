import { Controller } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Usuario")
@Controller("user")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // @Post()
  // async create(@Body() body: User) {
  //   return this.userService.create(body);
  // }

  // @Get()
  // async findAll() {
  //   return await this.userService.findAll();
  // }

  // @Get(":id")
  // async findOne(@Param("id") id: ObjectId) {
  //   return await this.userService.findOneById(id);
  // }

  // @Put(":id")
  // async update(
  //   @Param("id") id: ObjectId,
  //   @Body() updateUserDto: Partial<User>,
  // ) {
  //   return await this.userService.update(id, updateUserDto);
  // }

  // @Delete(":id")
  // async remove(@Param("id") id: ObjectId) {
  //   return await this.userService.remove(+id);
  // }
}
