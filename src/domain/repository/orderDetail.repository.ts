import { OrderDetail } from "../model/interface/orderDetail.interface";

export interface OrderDetailRepository {
  insert(orderDetail: OrderDetail): Promise<OrderDetail>;
  insertMany(orderDetail: OrderDetail[]): Promise<OrderDetail[]>;
  listByProductId(productId: number): Promise<OrderDetail[]>;
}