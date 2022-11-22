import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderVehicleRepository } from "src/domain/repository/ordervehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderByIdResponse } from "./listOrderById.response";

@Injectable()
export class ListOrderByIdUseCase implements BaseUseCase<number, ListOrderByIdResponse>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
  ) { }

  async get(id: number): Promise<ListOrderByIdResponse> {
    let order = await this._orderRepository.findOne(id, [
      'client', 'client.typeDocument',
      'orderStatus',
      'orderDetails', 'orderDetails.product', 'orderDetails.product.category'
    ]);
    let assignation = await this._orderVehicleRepository.findByOrderId(order.id, ['vehicle', 'vehicle.typeVehicle', 'vehicle.driver', 'vehicle.driver.person']);
    return new ListOrderByIdResponse(order, assignation);
  }
}
