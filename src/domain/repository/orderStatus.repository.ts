import { OrderStatus } from "../model/interface/orderStatus.interface";

export interface OrderStatusRepository {
  findAll(): Promise<OrderStatus[]>;
  findOne(id: number): Promise<OrderStatus>;
}