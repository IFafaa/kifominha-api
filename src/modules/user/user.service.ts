import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

    async create(_user: Omit<User, "_id">): Promise<User> {
      try {
        const user = await this.repository.create(_user);
        return this.repository.save(user);
      } catch (error) {
        throw error;
      }
    }

  async userIsRegistered(options: {
    cpf?: string;
    email?: string;
    phone?: string;
  }): Promise<User | null> {
    const hasCpfRegistered = options.cpf
      ? await this.findBy({ cpf: options.cpf })
      : null;
    const hasEmailRegistered = options.email
      ? await this.findBy({ email: options.email })
      : null;
    const hasPhoneRegistered = options.phone
      ? await this.findBy({ phone: options.phone })
      : null;

    return hasCpfRegistered ?? hasEmailRegistered ?? hasPhoneRegistered ?? null;
  }

  async findBy(filter: { [key: string]: any }): Promise<User | null> {
    try {
      const users = await this.repository.findOne({ where: filter });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.repository.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: ObjectId): Promise<User> {
    try {
      const user = await this.repository.findOne({
        _id: new ObjectId(id),
      } as any);
      return user;
    } catch (error) {      
      throw error;
    }
  }

  async update(id: ObjectId, _user: Partial<User>) {
    try {
      const user = await this.findOneById(id);            
      if (!user) {
        return null;
      }
      await this.repository.update(id,_user);
      const updatedUser = await this.findOneById(id);

      return updatedUser;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.repository.delete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
