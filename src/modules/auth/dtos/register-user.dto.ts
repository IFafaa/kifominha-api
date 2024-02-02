import { IsNotEmpty } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

export class RegisterUserDto extends User {
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
