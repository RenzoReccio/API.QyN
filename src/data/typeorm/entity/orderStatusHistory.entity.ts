import { Order } from "src/domain/model/interface/order.interface";
import { OrderStatus } from "src/domain/model/interface/orderStatus.interface";
import { OrderStatusHistory } from "src/domain/model/interface/orderStatusHistory.interface";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { OrderStatusEntity } from "./orderStatus.entity";

@Entity()
export class OrderStatusHistoryEntity extends BaseEntity implements OrderStatusHistory {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity)
  order: Order;

  @ManyToOne(() => OrderStatusEntity)
  orderStatus: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}