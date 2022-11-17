import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "src/domain/model/interface/orderStatus.interface";
import { OrderStatusHistory } from "src/domain/model/interface/orderStatusHistory.interface";

export class ListOrderStatusHistoryResponse {

  @ApiProperty()
  statusId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  date: Date;
  constructor(statusHistory: OrderStatusHistory) {
    this.statusId = statusHistory.orderStatus.id;
    this.status = statusHistory.orderStatus.name;
    this.date = statusHistory.createdAt;
  }
}