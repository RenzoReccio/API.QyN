import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "src/domain/model/interface/vehicle.inteface";

export class ListVehicleByIdResponse {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  idTypeVehicle: number;

  @ApiProperty()
  idDriver: number;

  @ApiProperty()
  plate: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  status: boolean;

  constructor(vehicle: Vehicle){
    this.id = vehicle.id;
    this.idTypeVehicle = vehicle.typeVehicle.id;
    this.idDriver = vehicle.driver.id;
    this.plate = vehicle.plate;
    this.brand = vehicle.brand;
    this.color = vehicle.color;
    this.status = vehicle.status;
  }
}