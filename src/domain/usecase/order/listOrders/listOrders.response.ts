import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/domain/model/interface/order.interface";

export class ListOrderResponse {

  @ApiProperty()
  id: number;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  clientEmail: string;
  
  @ApiProperty()
  orderStatusId: number;
  
  @ApiProperty()
  orderStatus: string;
  
  @ApiProperty()
  address: string;
  
  @ApiProperty()
  estimatedDate: Date;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.clientName = order.client.name;
    this.clientEmail = order.client.email;
    this.orderStatusId = order.orderStatus.id;
    this.orderStatus = order.orderStatus.name;
    this.address = order.address;
    this.estimatedDate = order.estimatedDate;
    this.comments = order.comments;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}