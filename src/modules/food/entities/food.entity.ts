import { Category } from "src/modules/category/entities/category.entity";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("foods")
export class Food {
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectId;

  @Column("restaurant_id")
  restaurant_id: ObjectId;

  @Column("name")
  name: string;

  @Column("image")
  image: string;

  @Column("description")
  description: string;

  @Column("price")
  price: number;

  @Column("serve")
  serve: number;

  @Column("category")
  category: Category;
}
