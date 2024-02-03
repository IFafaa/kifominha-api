import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export class ClientAuthConfig {
  authenticated: boolean;
  code: string;
}

export class ClientAuth {
  email: ClientAuthConfig;
}

@Entity("clients")
export class Client {
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectId;

  @Column("name")
  name: string;

  @Column("email")
  email: string;

  @Column("cpf")
  cpf: string;

  @Column("phone")
  phone: string;

  @Column("password")
  password: string;

  @Column("auth")
  auth: ClientAuth;
}
