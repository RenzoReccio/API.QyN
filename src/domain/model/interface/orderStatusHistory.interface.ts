import { Auditory } from "./base/auditory.interface";
import { Order } from "./order.interface";
import { OrderStatus } from "./orderStatus.interface";

export interface OrderStatusHistory extends Auditory{
  id: number;
  order: Order;
  orderStatus: OrderStatus;
}