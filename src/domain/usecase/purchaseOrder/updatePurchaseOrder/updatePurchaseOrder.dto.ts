import { ApiProperty } from "@nestjs/swagger";

export class UpdatePurchaseOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  arrivalDate: Date;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  purchaseOrderStatusId: number;
}