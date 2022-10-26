import { ApiProperty } from "@nestjs/swagger";

export class UpdatePurchaseOrderResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}