import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../../domain/model/interface/order.interface";
import { ClientEntity } from "./client.entity";
import { OrderDetailEntity } from "./orderDetail.entity";
import { OrderStatusEntity } from "./orderStatus.entity";

@Entity()
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (clientEntity) => clientEntity.orders)
  client: ClientEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetailEntity) => orderDetailEntity.order)
  orderDetails: OrderDetailEntity[];

  @ManyToOne(() => OrderStatusEntity)
  orderStatus: OrderStatusEntity;

  @Column()
  estimatedDate: Date;

  @Column()
  comments: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  punctuation: number;

  @Column({ nullable: true })
  postComments: string;
}