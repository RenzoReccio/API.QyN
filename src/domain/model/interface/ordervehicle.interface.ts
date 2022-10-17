import { Order } from "./order.interface";
import { Vehicle } from "./vehicle.inteface";

export interface OrderVehicle {
  id: number;
  order: Order;
  vehicle: Vehicle;
  date: Date;
}