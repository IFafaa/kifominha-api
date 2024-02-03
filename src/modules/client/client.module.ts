import { Module } from "@nestjs/common";
import { ClientService } from "./client.service";
import { ClientController } from "./client.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
