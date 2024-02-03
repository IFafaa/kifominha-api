import { IsNotEmpty } from "class-validator";
import { Food } from "../entities/food.entity";

export class CreateFoodDto extends Food {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  serve: number;
}
