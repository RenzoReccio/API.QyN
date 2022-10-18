import { ApiProperty } from "@nestjs/swagger";

export class CreateClientOrderResponse {
  @ApiProperty()
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}