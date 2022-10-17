import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "src/domain/model/interface/orderStatus.interface";

export class ListOrderStatusResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(status: OrderStatus) {
    this.id = status.id;
    this.name = status.name;
  }
}