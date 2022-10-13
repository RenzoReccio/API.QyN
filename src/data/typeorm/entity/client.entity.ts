import { Order } from "src/domain/model/interface/order.interface";
import { TypeDocument } from "src/domain/model/interface/typeDocument.interface";
import { User } from "src/domain/model/interface/users.interface";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "../../../domain/model/interface/client.interface";
import { OrderEntity } from "./order.entity";
import { TypeDocumentEntity } from "./typeDocument.entity";
import { UserEntity } from "./users.entity";

@Entity()
export class ClientEntity extends BaseEntity implements Client {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeDocumentEntity)
  typeDocument: TypeDocument;
  
  @Column()
  numberDocument: string;
  
  @Column()
  name: string;
  
  @Column()
  area: string;
  
  @Column()
  phone: string;
  
  @Column()
  email: string;
  
  @Column()
  address: string;
  
  @OneToMany(() => OrderEntity, (orderEntity)=> orderEntity.client)
  orders: Order[];
  
  @OneToOne(() => UserEntity, (userEntity) => userEntity.client)
  user: UserEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}