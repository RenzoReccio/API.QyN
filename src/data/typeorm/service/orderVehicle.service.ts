import { OrderVehicle } from "src/domain/model/interface/ordervehicle.interface";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { OrderVehicleEntity } from "../entity/ordervehicle.entity";

export class OrderVehicleService implements OrderVehicleRepository {
  insert(orderVehicle: OrderVehicle): Promise<OrderVehicle> {
    throw new Error("Method not implemented.");
  }
  
  async findAllByVehicleId(vehicleId: number, relations?: string[]): Promise<OrderVehicle[]> {
    return await OrderVehicleEntity.find({
      where: { vehicle: { id: vehicleId } }
      , relations: relations ?? []
    })
  }
  delete(orderVehicleId: number): Promise<OrderVehicle> {
    throw new Error("Method not implemented.");
  }

}