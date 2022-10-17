import { OrderVehicle } from "src/domain/model/interface/ordervehicle.interface";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { VehicleEntity } from "./vehicle.entity";

@Entity()
export class OrderVehicleEntity extends BaseEntity implements OrderVehicle {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> OrderEntity)
  order: OrderEntity;

  @ManyToOne(()=> VehicleEntity)
  vehicle: VehicleEntity;

  @Column()
  date: Date;
}