import { Client } from "./interface/client.interface";
import { Order } from "./interface/order.interface";
import { OrderDetail } from "./interface/orderDetail.interface";
import { OrderStatus } from "./interface/orderStatus.interface";

export class OrderModel implements Order {


  id: number;
  client: Client;
  orderStatus: OrderStatus;
  estimatedDate: Date;
  comments: string;
  orderDetails: OrderDetail[];
  address: string;
  createdAt: Date;
  updatedAt: Date;
  punctuation: number;
  postComments: string;

  constructor(
    id: number, client: Client, orderStatus: OrderStatus, address: string,
    estimatedDate: Date, comments: string, orderDetails: OrderDetail[],
    punctuation?: number, postComments?: string
  ) {
    this.id = id;
    this.client = client;
    this.orderStatus = orderStatus;
    this.estimatedDate = estimatedDate;
    this.comments = comments;
    this.orderDetails = orderDetails;
    this.address = address;
    this.punctuation = punctuation;
    this.postComments = postComments;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }
}