import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";

export class ListPurchaseOrdersResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  supplierName: string;

  @ApiProperty()
  arrivalDate: Date;

  @ApiProperty()
  comments: String;

  @ApiProperty()
  purchaseOrderStatusId: number;

  @ApiProperty()
  purchaseOrderStatus: string;

  constructor(purchaseOrder: PurchaseOrder) {
    this.id = purchaseOrder.id;
    this.supplierName = purchaseOrder.supplier.name;
    this.arrivalDate = purchaseOrder.arrivalDate;
    this.comments = purchaseOrder.comments;
    this.purchaseOrderStatus = purchaseOrder.purchaseOrderStatus.name;
    this.purchaseOrderStatusId = purchaseOrder.purchaseOrderStatus.id;
  }
}