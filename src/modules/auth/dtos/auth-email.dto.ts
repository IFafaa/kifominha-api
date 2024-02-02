import { IsNotEmpty } from "class-validator";

export class AuthEmailDto {
  @IsNotEmpty()
  code: string;
}
