import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/domain/model/interface/order.interface";

export class ListOrdersToAssignResponse {

  @ApiProperty()
  id: number;

  @ApiProperty()
  clientName: string;
 
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
    this.address = order.address;
    this.estimatedDate = order.estimatedDate;
    this.comments = order.comments;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}