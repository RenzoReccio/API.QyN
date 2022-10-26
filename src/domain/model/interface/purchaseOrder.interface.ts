import { Auditory } from "./base/auditory.interface";
import { PurchaseOrderDetail } from "./purchaseOrderDetail.interface";
import { PurchaseOrderStatus } from "./purchaseOrderStatus.interface";
import { Supplier } from "./supplier.interface";

export interface PurchaseOrder extends Auditory {
  id: number;
  supplier: Supplier;
  arrivalDate: Date;
  comments: string;
  purchaseOrderStatus: PurchaseOrderStatus;
  purchaseOrderDetails: PurchaseOrderDetail[];
}