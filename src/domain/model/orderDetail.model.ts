import { Order } from "./interface/order.interface";
import { OrderDetail } from "./interface/orderDetail.interface";
import { Product } from "./interface/product.interface";

export class OrderDetailModel implements OrderDetail {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  salesPrice: number;

  constructor(
    id: number, order: Order, product: Product,
    quantity: number, salesPrice: number
  ) {
    this.id = id;
    this.order = order;
    this.product = product;
    this.quantity = quantity;
    this.salesPrice = salesPrice;
  }
}