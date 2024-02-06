import { Injectable } from "@nestjs/common";
import { Client } from "./entities/client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly repository: Repository<Client>,
  ) {}

  async create(_client: Omit<Client, "_id">): Promise<Client> {
    try {
      const client = await this.repository.create(_client);
      return this.repository.save(client);
    } catch (error) {
      throw error;
    }
  }

  async clientIsRegistered(options: {
    cpf?: string;
    email?: string;
    phone?: string;
  }): Promise<Client | null> {
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

  async findBy(filter: { [key: string]: any }): Promise<Client | null> {
    try {
      const clients = await this.repository.findOne({ where: filter });
      return clients;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const clients = await this.repository.find();
      return clients;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: ObjectId): Promise<Client> {
    try {
      const client = await this.repository.findOne({
        _id: new ObjectId(id),
      } as any);
      return client;
    } catch (error) {
      throw error;
    }
  }

  async update(id: ObjectId, _client: Partial<Client>) {
    try {
      const client = await this.findOneById(id);
      if (!client) {
        return null;
      }
      await this.repository.update(id, _client);
      const updatedClient = await this.findOneById(id);

      return updatedClient;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const client = await this.repository.delete(id);
      return client;
    } catch (error) {
      throw error;
    }
  }
}
