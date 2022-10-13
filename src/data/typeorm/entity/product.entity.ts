import { Category } from "src/domain/model/interface/category.interface";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../../domain/model/interface/product.interface";
import { CategoryEntity } from "./category.entity";

@Entity()
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: 0 })
  salesPrice: number;

  @Column({ nullable: true, default: 0 })
  purchasePrice: number;

  @Column({ nullable: true, default: 0 })
  stock: number;

  @Column({ nullable: true, default: false })
  showInCatalog: boolean;

  @Column({ nullable: true, default: '' })
  urlImage: string;

  @ManyToOne(() => CategoryEntity)
  category: Category;

  @Column()
  minStock: number;

  @Column()
  maxStock: number;
}