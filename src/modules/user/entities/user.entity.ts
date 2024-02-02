import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export class UserAuthConfig {
  authenticated: boolean;
  code: string;
}

export class UserAuth {
  email: UserAuthConfig;
}

@Entity("users")
export class User {
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
  auth: UserAuth;
}
