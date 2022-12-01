import { PurchaseOrder } from "../model/interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "../model/interface/purchaseOrderDetail.interface";
import { Supplier } from "../model/interface/supplier.interface";
export interface PurchaseOrderMailRepository {
  sendMailToSupplier(supplier: Supplier, purchaseOrder: PurchaseOrder, purchaseOrderDetail: PurchaseOrderDetail[]): Promise<void>;
}