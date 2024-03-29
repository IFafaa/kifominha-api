import { Injectable } from "@nestjs/common";
import { Restaurant } from "./entities/restaurant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { FoodService } from "../food/food.service";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
    private readonly foodService: FoodService,
  ) {}

  async create(_restaurant: Omit<Restaurant, "_id">): Promise<Restaurant> {
    try {
      const restaurant = await this.repository.create(_restaurant);
      return this.repository.save(restaurant);
    } catch (error) {
      throw error;
    }
  }

  async restaurantIsRegistered(options: {
    cnpj?: string;
    email?: string;
    phone?: string;
  }): Promise<Restaurant | null> {
    const hasCpfRegistered = options.cnpj
      ? await this.findBy({ cnpj: options.cnpj })
      : null;
    const hasEmailRegistered = options.email
      ? await this.findBy({ email: options.email })
      : null;
    const hasPhoneRegistered = options.phone
      ? await this.findBy({ phone: options.phone })
      : null;

    return hasCpfRegistered ?? hasEmailRegistered ?? hasPhoneRegistered ?? null;
  }

  async findBy(filter: Partial<Restaurant>): Promise<Restaurant | null> {
    try {
      const restaurant = await this.repository.findOne({ where: filter });
      return restaurant;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const restaurant = (await this.repository.find())
        .map((restaurant) => ({
          ...restaurant,
          password: undefined,
        }))
        .filter((restaurant) => restaurant.auth.email.authenticated);
      return restaurant;
    } catch (error) {
      throw error;
    }
  }

  async findAllBy(filter: Partial<Restaurant>): Promise<Restaurant[]> {
    try {
      const restaurants = await this.findAll();

      for (const key in filter) {
        if (
          filter[key] === "undefined" ||
          filter[key] === null ||
          filter[key] === undefined
        ) {
          delete filter[key];
        }
      }
      if (filter.name) {
        return restaurants.filter((food) =>
          food.name.toLowerCase().includes(filter.name.toLowerCase()),
        );
      }
      return restaurants;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: ObjectId): Promise<Restaurant> {
    try {
      const restaurant = await this.repository.findOne({
        _id: new ObjectId(id),
      } as any);
      delete restaurant.password;
      return restaurant;
    } catch (error) {
      throw error;
    }
  }

  async update(id: ObjectId, _restaurant: Partial<Restaurant>) {
    try {
      const restaurant = await this.findOneById(id);
      if (!restaurant) {
        return null;
      }
      await this.repository.update(id, _restaurant);
      const updatedRestaurant = await this.findOneById(id);

      return updatedRestaurant;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.foodService.removeBy({ restaurant_id: id });
      const restaurant = await this.repository.delete(id);
      return restaurant;
    } catch (error) {
      throw error;
    }
  }
}
