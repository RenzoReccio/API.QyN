import { ApiProperty } from "@nestjs/swagger";

export class CreatePurchaseOrderResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}