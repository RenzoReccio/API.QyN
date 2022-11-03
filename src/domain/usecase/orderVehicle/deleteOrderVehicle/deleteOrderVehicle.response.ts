import { ApiProperty } from "@nestjs/swagger";

export class DeleteOrderVehicleResponse {
  @ApiProperty()
  id: number;

  constructor(id: number){
    this.id = id;
  }
}