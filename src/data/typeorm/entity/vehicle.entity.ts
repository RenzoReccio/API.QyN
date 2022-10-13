import { Driver } from "src/domain/model/interface/driver.interface";
import { TypeVehicle } from "src/domain/model/interface/typeVehicle.interface";
import { Vehicle } from "src/domain/model/interface/vehicle.inteface";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";
import { TypeVehicleEntity } from "./typeVehicle.entity";

@Entity()
export class VehicleEntity extends BaseEntity implements Vehicle {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeVehicleEntity)
  typeVehicle: TypeVehicle;

  @ManyToOne(() => DriverEntity)
  driver: Driver;

  @Column()
  plate: string;

  @Column()
  brand: string;

  @Column()
  color: string;
}