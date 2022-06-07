import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeProductEnum } from "../enum/product.enum";
import { Product } from "../../../domain/model/interface/product.interface";

@Entity()
export class ProductEntity extends BaseEntity implements Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: 0 })
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TypeProductEnum
  })
  type: TypeProductEnum;

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
}