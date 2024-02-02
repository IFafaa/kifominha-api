import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Usuario")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
