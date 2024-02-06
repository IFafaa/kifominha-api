import { IsNotEmpty } from "class-validator";
import { Category } from "src/modules/category/entities/category.entity";
import {
  Address,
  Restaurant,
} from "src/modules/restaurant/entities/restaurant.entity";

export class RegisterRestaurantDto extends Restaurant {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: Address;

  @IsNotEmpty()
  categories: Category[];

  logo: string;
}
