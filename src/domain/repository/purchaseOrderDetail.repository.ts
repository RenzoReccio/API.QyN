import { PurchaseOrderDetail } from "../model/interface/purchaseOrderDetail.interface";

export interface PurchaseOrderDetailRepository {
  insert(orderDetail: PurchaseOrderDetail): Promise<PurchaseOrderDetail>;
  insertMany(orderDetail: PurchaseOrderDetail[]): Promise<PurchaseOrderDetail[]>;
  listByProductId(productId: number): Promise<PurchaseOrderDetail[]>;
}