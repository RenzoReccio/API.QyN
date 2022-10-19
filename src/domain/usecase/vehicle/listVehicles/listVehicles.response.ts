import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "src/domain/model/interface/vehicle.inteface";

export class ListVehiclesResponse {

  @ApiProperty()
  id: number;

  @ApiProperty()
  plate: string;

  @ApiProperty()
  typeVehicle: string;

  @ApiProperty()
  status: boolean;

  constructor(vehicle: Vehicle){
    this.id = vehicle.id;
    this.plate = vehicle.plate;
    this.typeVehicle = vehicle.typeVehicle.name;
    this.status = vehicle.status;
  }
}