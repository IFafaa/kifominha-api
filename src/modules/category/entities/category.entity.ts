import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("categories")
export class Category {
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectId;

  @Column("name")
  name: string;
}
