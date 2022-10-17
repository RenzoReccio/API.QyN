import { Order } from "src/domain/model/interface/order.interface";

export class UpdateOrderResponse {
  id: number;
  constructor(order: Order) {
    this.id = order.id;
  }
}