import { PurchaseOrderDetail } from "./purchaseOrderDetail.interface";
import { PurchaseOrderStatus } from "./purchaseOrderStatus.interface";
import { Supplier } from "./supplier.interface";

export interface PurchaseOrder {
  id: number;
  supplier: Supplier;
  arrivalDate: Date;
  comments: String;
  purchaseOrderStatus: PurchaseOrderStatus;
  purchaseOrderDetails: PurchaseOrderDetail[];
}