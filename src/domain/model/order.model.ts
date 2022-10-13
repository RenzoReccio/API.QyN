import { ApiProperty } from "@nestjs/swagger";
import { Client } from "./interface/client.interface";
import { Order } from "./interface/order.interface";
import { OrderDetail } from "./interface/orderDetail.interface";
import { OrderStatus } from "./interface/orderStatus.interface";

export class OrderModel implements Order {

    
  address: string;
  id: number;
  client: Client;
  orderStatus: OrderStatus;
  estimatedDate: Date;
  comments: string;
  orderDetails: OrderDetail[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number, client: Client, orderStatus: OrderStatus, address: string,
    estimatedDate: Date, comments: string, orderDetails: OrderDetail[]
  ) {
    this.id = id;
    this.client = client;
    this.orderStatus = orderStatus;
    this.estimatedDate = estimatedDate;
    this.comments = comments;
    this.orderDetails = orderDetails;
    this.address = address;
  }
}