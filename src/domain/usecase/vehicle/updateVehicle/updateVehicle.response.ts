import { ApiProperty } from "@nestjs/swagger";

export class UpdateVehicleResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}