import { OrderVehicle } from "../model/interface/ordervehicle.interface";

export interface OrderVehicleRepository {
  insert(orderVehicle: OrderVehicle): Promise<OrderVehicle>;
  findAllByVehicleId(vehicleId: number,relations?: string[]): Promise<OrderVehicle[]>;
  delete(orderVehicleId: number): Promise<OrderVehicle>;
}