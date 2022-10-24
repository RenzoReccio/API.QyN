import { PurchaseOrder } from "../model/interface/purchaseOrder.interface";

export interface PurchaseOrderRepository {
  insert(PurchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;
  update(PurchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;
  findAll(relations?: string[]): Promise<PurchaseOrder[]>;
  findOne(id: number, relations?: string[]): Promise<PurchaseOrder>;
}