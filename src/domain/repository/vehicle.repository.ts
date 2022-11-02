import { Vehicle } from "src/domain/model/interface/vehicle.inteface";

export interface VehicleRepository{
  findAll(relations?: string[]): Promise<Vehicle[]>;
  findOne(id: number, relations?: string[]): Promise<Vehicle>;
  findByPlate(plate: string, id: number): Promise<Vehicle>;
  insert(vehicle: Vehicle): Promise<Vehicle>;
  update(vehicle: Vehicle): Promise<Vehicle>;
}