import { TypeVehicle } from "../model/interface/typeVehicle.interface";

export interface TypeVehicleRepository {
  findAll(): Promise<TypeVehicle[]>;
  findOne(id: number): Promise<TypeVehicle>;
}