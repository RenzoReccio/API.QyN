import { OrderStatus } from "./interface/orderStatus.interface";

export class OrderStatusModel implements OrderStatus {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}