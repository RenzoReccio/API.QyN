import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrderStatus } from "src/domain/model/interface/purchaseOrderStatus.interface";

export class ListPurchaseOrderStatusResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(status: PurchaseOrderStatus) {
    this.id = status.id;
    this.name = status.name;
  }
}