import { Product } from "./product.interface";
import { PurchaseOrder } from "./purchaseOrder.interface";

export interface PurchaseOrderDetail {
  id: number;
  purchaseOrder: PurchaseOrder;
  product: Product;
  purchasePrice: number;
  quantity: number;
}