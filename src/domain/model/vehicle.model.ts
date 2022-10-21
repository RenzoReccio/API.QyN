import { Driver } from "./interface/driver.interface";
import { TypeVehicle } from "./interface/typeVehicle.interface";
import { Vehicle } from "./interface/vehicle.inteface";

export class VehicleModel implements Vehicle {
  id: number;
  typeVehicle: TypeVehicle;
  driver: Driver;
  plate: string;
  brand: string;
  color: string;
  status: boolean;

  constructor(id: number,
    typeVehicle: TypeVehicle,
    driver: Driver,
    plate: string,
    brand: string,
    color: string,
    status: boolean) {

    this.id = id;
    this.typeVehicle = typeVehicle;
    this.driver = driver;
    this.plate = plate;
    this.brand = brand;
    this.color = color;
    this.status = status;

  }

}