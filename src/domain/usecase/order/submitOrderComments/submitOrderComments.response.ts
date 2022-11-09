import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/domain/model/interface/order.interface";

export class SubmitOrderCommentsResponse {
  @ApiProperty()
  id: number;

  constructor(order: Order) {
    this.id = order.id;
  }
}