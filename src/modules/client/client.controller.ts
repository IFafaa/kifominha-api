import { Controller, Delete, Param } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ApiTags } from "@nestjs/swagger";
import { ObjectId } from "typeorm";

@ApiTags("Cliente")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Delete(":id")
  async remove(@Param("id") id: ObjectId) {
    return await this.clientService.remove(id);
  }
}
