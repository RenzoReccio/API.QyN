import { ApiProperty } from "@nestjs/swagger";
import { StatusOrderEnum } from "src/data/typeorm/enum/order.enum";
import { Client } from "./interface/client.interface";
import { Order } from "./interface/order.interface";
import { OrderDetail } from "./interface/orderDetail.interface";

export class OrderModel implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  client: Client;

  @ApiProperty({ enum: StatusOrderEnum })
  status: StatusOrderEnum;

  @ApiProperty()
  estimatedDate: Date;

  @ApiProperty()
  comments: String;

  @ApiProperty()
  orderDetails: OrderDetail[];

  constructor(
    id: number, client: Client, status: StatusOrderEnum,
    estimatedDate: Date,  comments: string, orderDetails: OrderDetail[]
  ) {
    this.id = id;
    this.client = client;
    this.status = status;
    this.estimatedDate = estimatedDate;
    this.comments = comments;
    this.orderDetails = orderDetails;
  }
}