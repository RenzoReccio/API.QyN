import { OrderStatus } from "src/domain/model/interface/orderStatus.interface";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class OrderStatusEntity extends BaseEntity implements OrderStatus {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}