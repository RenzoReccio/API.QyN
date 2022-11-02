import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderVehicleResponse {
  @ApiProperty()
  id: number;
  
  constructor(id: number){
    this.id = id;
  }
}