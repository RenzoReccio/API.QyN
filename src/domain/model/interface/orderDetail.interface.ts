import { Order } from "./order.interface";
import { Product } from "./product.interface";

export interface OrderDetail {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
}