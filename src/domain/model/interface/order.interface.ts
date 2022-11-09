import { Auditory } from "./base/auditory.interface";
import { Client } from "./client.interface";
import { OrderDetail } from "./orderDetail.interface";
import { OrderStatus } from "./orderStatus.interface";

export interface Order extends Auditory{
  id: number;
  client: Client;
  orderStatus: OrderStatus;
  address: string;
  estimatedDate: Date;
  comments: string;
  orderDetails: OrderDetail[];
  punctuation: number;
  postComments: string;
}