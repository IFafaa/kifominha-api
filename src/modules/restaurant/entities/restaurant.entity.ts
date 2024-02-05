import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export class Address {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

export class RestaurantAuthConfig {
  authenticated: boolean;
  code: string;
}

export class RestaurantAuth {
  email: RestaurantAuthConfig;
}

@Entity("restaurants")
export class Restaurant {
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectId;

  @Column("email")
  email: string;

  @Column("name")
  name: string;

  @Column("categories")
  categories: Category[];

  @Column("password")
  password: string;

  @Column("cnpj")
  cnpj: string;

  @Column("phone")
  phone: string;

  @Column("auth")
  auth: RestaurantAuth;

  @Column("address")
  address: Address;

  @Column("logo")
  logo: string;
}
