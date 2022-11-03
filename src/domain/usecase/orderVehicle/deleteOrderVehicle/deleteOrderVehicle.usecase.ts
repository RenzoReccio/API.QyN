import { Injectable, Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { DeleteOrderVehicleResponse } from "./deleteOrderVehicle.response";

@Injectable()
export class DeleteOrderVehicleUseCase implements BaseUseCase<number, DeleteOrderVehicleResponse>{

  constructor(
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
  ) { }

  async get(id: number): Promise<DeleteOrderVehicleResponse> {
    let orderVehicle = await this._orderVehicleRepository.findOne(id);
    if(!orderVehicle) throw new ResourceNotFound('La asignacion indicada no se encuentra registrado');

    await this._orderVehicleRepository.delete(orderVehicle)
    return new DeleteOrderVehicleResponse(orderVehicle.id)
  }
}