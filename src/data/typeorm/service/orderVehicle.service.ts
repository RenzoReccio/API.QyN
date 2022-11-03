import { OrderVehicle } from "src/domain/model/interface/ordervehicle.interface";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { OrderVehicleEntity } from "../entity/ordervehicle.entity";

export class OrderVehicleService implements OrderVehicleRepository {
  async findByOrderId(orderId: number): Promise<OrderVehicle> {
    return await OrderVehicleEntity.findOne({
      where: { order: orderId }
    })
  }

  async findOne(id: number, relations?: string[]): Promise<OrderVehicle> {
    return await OrderVehicleEntity.findOne({
      where: { id: id },
      relations: relations ?? []
    })
  }

  async insert(orderVehicle: OrderVehicle): Promise<OrderVehicle> {
    return await OrderVehicleEntity.create(orderVehicle).save();
  }

  async findAllByVehicleId(vehicleId: number, relations?: string[]): Promise<OrderVehicle[]> {
    return await OrderVehicleEntity.find({
      where: { vehicle: { id: vehicleId } },
      relations: relations ?? []
    })
  }
  async delete(orderVehicle: OrderVehicle): Promise<OrderVehicle> {
    return await OrderVehicleEntity.create(orderVehicle).remove();
  }

}