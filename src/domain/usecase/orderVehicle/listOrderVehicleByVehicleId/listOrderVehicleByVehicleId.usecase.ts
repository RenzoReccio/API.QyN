import { Injectable, Inject } from "@nestjs/common";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderVehicleByVehicleIdResponse } from "./listOrderVehicleByVehicleId.response";

@Injectable()
export class ListOrderVehicleByVehicleIdUseCase implements BaseUseCase<number, ListOrderVehicleByVehicleIdResponse[]>{

  constructor(
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
  ) { }

  async get(idVehicle: number): Promise<ListOrderVehicleByVehicleIdResponse[]> {
    let orders = await this._orderVehicleRepository.findAllByVehicleId(idVehicle, ['order.client', 'order']);
    return orders.map(item => { return new ListOrderVehicleByVehicleIdResponse(item) });
  }
}