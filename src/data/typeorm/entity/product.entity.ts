import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TypeProductEnum } from "../enum/product.enum";
import { Product } from "../../../domain/model/interface/product.interface";

@Entity()
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TypeProductEnum
  })
  type: TypeProductEnum;
}