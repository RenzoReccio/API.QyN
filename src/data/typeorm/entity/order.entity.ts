import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusOrderEnum } from "../enum/order.enum";
import { ClientEntity } from "./client.entity";
import { Order } from "../../../domain/model/interface/order.interface";
import { OrderDetailEntity } from "./orderDetail.entity";

@Entity()
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (clientEntity) => clientEntity.orders)
  client: ClientEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetailEntity) => orderDetailEntity.order)
  orderDetails: OrderDetailEntity[];

  @Column({ type: 'enum', enum: StatusOrderEnum, default: StatusOrderEnum.CREADO })
  status: StatusOrderEnum;

  @Column()
  estimatedDate: Date;

  @Column()
  comments: string;

  @Column({nullable: true})
  address: string;
  
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}