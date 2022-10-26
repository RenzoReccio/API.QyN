import { Product } from "./interface/product.interface";
import { PurchaseOrder } from "./interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "./interface/purchaseOrderDetail.interface";

export class PurchaseOrderDetailModel implements PurchaseOrderDetail {
  id: number;
  purchaseOrder: PurchaseOrder;
  product: Product;
  purchasePrice: number;
  quantity: number;

  constructor(
    id: number,
    purchaseOrder: PurchaseOrder,
    product: Product,
    purchasePrice: number,
    quantity: number,
  ) {
    this.id = id;
    this.purchaseOrder = purchaseOrder;
    this.product = product;
    this.purchasePrice = purchasePrice;
    this.quantity = quantity;
  }
}