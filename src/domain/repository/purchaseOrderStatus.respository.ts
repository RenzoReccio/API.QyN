import { PurchaseOrderStatus } from "../model/interface/purchaseOrderStatus.interface";

export interface PurchaseOrderStatusRepository {
  findAll(relations?: string[]): Promise<PurchaseOrderStatus[]>;
  findOne(id: number, relations?: string[]): Promise<PurchaseOrderStatus>;
}