import { Category } from "src/domain/model/interface/category.interface";
import { Entity, BaseEntity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}