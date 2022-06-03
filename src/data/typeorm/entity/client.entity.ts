import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "../../../domain/model/interface/client.interface";
import { Order } from "../../../domain/model/interface/order.interface";
import { User } from "../../../domain/model/interface/users.interface";
import { OrderEntity } from "./order.entity";
import { UserEntity } from "./users.entity";

@Entity()
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruc: string;

  @Column()
  name: string;

  @Column()
  area: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => OrderEntity, (orderEntity) => orderEntity.client)
  orders: OrderEntity[];

  @ManyToMany(() => UserEntity, (userEntity) => userEntity.clients)
  @JoinTable()
  users: UserEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}