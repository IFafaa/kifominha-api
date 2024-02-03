import { Controller } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Restaurante")
@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
}
