import { Order } from "../model/interface/order.interface";
import { OrderDetail } from "../model/interface/orderDetail.interface";
import { User } from "../model/interface/users.interface";

export interface OrderMailRepository {
  sendMailToClient(user: User, order: Order, orderDetail: OrderDetail[]): Promise<void>;
}