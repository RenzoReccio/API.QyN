import { ApiProperty } from "@nestjs/swagger";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "src/domain/model/interface/purchaseOrderDetail.interface";

export class DetailListPurchaseOrderByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  quantity: number;


  constructor(detail: PurchaseOrderDetail) {
    this.id = detail.id;
    this.productId = detail.product.id;
    this.productName = detail.product.name;
    this.purchasePrice = detail.purchasePrice;
    this.quantity = detail.quantity;
  }
}


export class ListPurchaseOrderByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  arrivalDate: Date;

  @ApiProperty()
  comments: String;

  @ApiProperty()
  purchaseOrderStatusId: number;

  @ApiProperty()
  purchaseOrderDetails: DetailListPurchaseOrderByIdResponse[];

  constructor(purchaseOrder: PurchaseOrder) {
    this.id = purchaseOrder.id;
    this.supplierId = purchaseOrder.supplier.id;
    this.arrivalDate = purchaseOrder.arrivalDate;
    this.comments = purchaseOrder.comments;
    this.purchaseOrderStatusId = purchaseOrder.purchaseOrderStatus.id;
    this.purchaseOrderDetails = purchaseOrder.purchaseOrderDetails.map(item => { return new DetailListPurchaseOrderByIdResponse(item) })
  }
}