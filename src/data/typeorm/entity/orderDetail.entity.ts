import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "../../../domain/model/interface/orderDetail.interface";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class OrderDetailEntity extends BaseEntity implements OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => OrderEntity, (orderEntity) => orderEntity.orderDetails)
  order: OrderEntity;
  
  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column()
  salesPrice: number;
}