import { ApiProperty } from "@nestjs/swagger";
import { OrderVehicle } from "src/domain/model/interface/ordervehicle.interface";

export class ListOrderVehicleByVehicleIdResponse {

  @ApiProperty()
  id: number;
 
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  arrivalDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(orderVehicle: OrderVehicle) {
    this.id = orderVehicle.id;
    this.orderId = orderVehicle.order.id
    this.clientName = orderVehicle.order.client.name;
    this.address = orderVehicle.order.address;
    this.arrivalDate = orderVehicle.date;
    this.createdAt = orderVehicle.order.createdAt;
    this.updatedAt = orderVehicle.order.updatedAt;
  }
}
