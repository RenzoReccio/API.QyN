import { Order } from "./interface/order.interface";
import { OrderVehicle } from "./interface/ordervehicle.interface";
import { Vehicle } from "./interface/vehicle.inteface";

export class OrderVehicleModel implements OrderVehicle {
  id: number;
  order: Order;
  vehicle: Vehicle;
  date: Date;

  constructor(
    id: number,
    order: Order,
    vehicle: Vehicle,
    date: Date,
  ){
    this.id = id;
    this.order = order;
    this.vehicle = vehicle;
    this.date = date;
  }
}