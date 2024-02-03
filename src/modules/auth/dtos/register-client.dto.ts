import { IsNotEmpty } from "class-validator";
import { Client } from "src/modules/client/entities/client.entity";

export class RegisterClientDto extends Client {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  phone: string;

  
}
