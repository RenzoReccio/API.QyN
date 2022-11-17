import { Order } from "./interface/order.interface";
import { OrderStatus } from "./interface/orderStatus.interface";
import { OrderStatusHistory } from "./interface/orderStatusHistory.interface";

export class OrderStatusHistoryModel implements OrderStatusHistory {
  id: number;
  order: Order;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number,
    order: Order,
    orderStatus: OrderStatus,
  ) {
    this.id = id;
    this.order = order;
    this.orderStatus = orderStatus;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }
}