import { StatusOrderEnum } from "../../../data/typeorm/enum/order.enum";
import { Client } from "./client.interface";
import { OrderDetail } from "./orderDetail.interface";

export interface Order {
  id: number;
  client: Client;
  status: StatusOrderEnum;
  address: string;
  estimatedDate: Date;
  comments: string;
  orderDetails: OrderDetail[];
}