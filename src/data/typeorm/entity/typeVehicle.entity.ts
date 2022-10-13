import { TypeVehicle } from "src/domain/model/interface/typeVehicle.interface";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TypeVehicleEntity extends BaseEntity implements TypeVehicle {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}