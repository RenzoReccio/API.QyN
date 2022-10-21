import { ApiProperty } from "@nestjs/swagger";
import { TypeVehicle } from "src/domain/model/interface/typeVehicle.interface";

export class ListTypeVehiclesResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(typeVehicle: TypeVehicle) {
    this.id = typeVehicle.id;
    this.name = typeVehicle.name;
  }
}