import { OrderStatusHistory } from "../model/interface/orderStatusHistory.interface";

export interface OrderStatusHistoryRepository {
  insert(orderStatusHistory: OrderStatusHistory): Promise<OrderStatusHistory>;
  findByOrderId(orderId: number, relations?: string[]): Promise<OrderStatusHistory[]>;
}