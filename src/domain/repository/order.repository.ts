import { Order } from "../model/interface/order.interface";

export interface OrderRepository {
  insert(order: Order): Promise<Order>;
  findAll(relations?: string[]): Promise<Order[]>;
}