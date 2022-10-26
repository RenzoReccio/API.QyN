import { PurchaseOrder } from "./interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "./interface/purchaseOrderDetail.interface";
import { PurchaseOrderStatus } from "./interface/purchaseOrderStatus.interface";
import { Supplier } from "./interface/supplier.interface";

export class PurchaseOrderModel implements PurchaseOrder {
  id: number;
  supplier: Supplier;
  arrivalDate: Date;
  comments: string;
  purchaseOrderStatus: PurchaseOrderStatus;
  purchaseOrderDetails: PurchaseOrderDetail[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    supplier: Supplier,
    arrivalDate: Date,
    comments: string,
    purchaseOrderStatus: PurchaseOrderStatus,
    purchaseOrderDetails: PurchaseOrderDetail[]
  ) {
    this.id = id;
    this.supplier = supplier;
    this.arrivalDate = arrivalDate;
    this.comments = comments;
    this.purchaseOrderStatus = purchaseOrderStatus;
    this.purchaseOrderDetails = purchaseOrderDetails;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }
}