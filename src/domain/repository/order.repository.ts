import { Order } from "../model/interface/order.interface";

export interface OrderRepository {
  insert(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  findAll(relations?: string[]): Promise<Order[]>;
  findOne(id: number, relations?: string[]): Promise<Order>;
  getStates(): Promise<string[]>;
}