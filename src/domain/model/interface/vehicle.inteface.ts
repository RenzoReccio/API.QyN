import { Driver } from "./driver.interface";
import { TypeVehicle } from "./typeVehicle.interface";

export interface Vehicle {
  id: number;
  typeVehicle: TypeVehicle;
  driver: Driver;
  plate: string;
  brand: string;
  color: string;
}