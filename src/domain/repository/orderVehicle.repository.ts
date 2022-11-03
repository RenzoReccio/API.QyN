import { OrderVehicle } from "../model/interface/ordervehicle.interface";

export interface OrderVehicleRepository {
  insert(orderVehicle: OrderVehicle): Promise<OrderVehicle>;
  findAllByVehicleId(vehicleId: number,relations?: string[]): Promise<OrderVehicle[]>;
  findOne(id: number,relations?: string[]): Promise<OrderVehicle>;
  findByOrderId(orderId: number): Promise<OrderVehicle>;
  delete(orderVehicle: OrderVehicle): Promise<OrderVehicle>;
}