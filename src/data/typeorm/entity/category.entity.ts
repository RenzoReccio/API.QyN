import { Category } from "src/domain/model/interface/category.interface";
import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}