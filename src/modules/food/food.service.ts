import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { Food } from "./entities/food.entity";
import { Restaurant } from "../restaurant/entities/restaurant.entity";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly repository: Repository<Food>,
  ) {}

  async create(
    _food: Omit<Food, "_id">,
    restaurant: Restaurant,
  ): Promise<Food> {
    try {
      _food.restaurant_id = restaurant._id;
      const food = await this.repository.create(_food);
      return this.repository.save(food);
    } catch (error) {
      throw error;
    }
  }

  async findBy(filter: Partial<Food>): Promise<Food | null> {
    try {
      const food = await this.repository.findOne({ where: filter });
      return food;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const food = await this.repository.find();
      return food;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: ObjectId): Promise<Food> {
    try {
      const food = await this.repository.findOne({
        _id: new ObjectId(id),
      } as any);
      return food;
    } catch (error) {
      throw error;
    }
  }

  async update(id: ObjectId, _food: Partial<Food>) {
    try {
      const food = await this.findOneById(id);
      if (!food) {
        return null;
      }
      await this.repository.update(id, _food);
      const updatedFood = await this.findOneById(id);

      return updatedFood;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: ObjectId) {
    try {
      const food = await this.repository.delete(id);
      return food;
    } catch (error) {
      throw error;
    }
  }
}
