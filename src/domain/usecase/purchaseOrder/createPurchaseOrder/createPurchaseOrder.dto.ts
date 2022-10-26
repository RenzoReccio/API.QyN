import { ApiProperty } from "@nestjs/swagger";

export class DetailCreatePurchaseOrderDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  quantity: number;
}
export class CreatePurchaseOrderDto {
  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  arrivalDate: Date;

  @ApiProperty()
  comments: string;

  @ApiProperty({ type: [DetailCreatePurchaseOrderDto], isArray: true })
  purchaseOrderDetails: DetailCreatePurchaseOrderDto[];
}