import { Injectable, Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { OrderStatusHistoryModel } from "src/domain/model/orderStatusHistory.model";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { OrderStatusHistoryRepository } from "src/domain/repository/orderStatusHistory.repository";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { DeleteOrderVehicleResponse } from "./deleteOrderVehicle.response";

@Injectable()
export class DeleteOrderVehicleUseCase implements BaseUseCase<number, DeleteOrderVehicleResponse>{

  constructor(
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository,
    @Inject('OrderStatusHistoryRepository') private _orderStatusHistoryRepository: OrderStatusHistoryRepository,

  ) { }

  async get(id: number): Promise<DeleteOrderVehicleResponse> {
    let orderVehicle = await this._orderVehicleRepository.findOne(id, ['order']);
    if (!orderVehicle) throw new ResourceNotFound('La asignacion indicada no se encuentra registrado');
    let order = await this._orderRepository.findOne(orderVehicle.order.id, ['orderStatus'])
    if (order.orderStatus.id == 7) throw new ValidationError('El pedido ya ha sido entregado');

    //En preparacion
    let orderStatus = await this._orderStatusRepository.findOne(4);
    order.orderStatus = orderStatus;
    
    await this._orderStatusHistoryRepository.insert(new OrderStatusHistoryModel(undefined, order, orderStatus));
    await this._orderRepository.update(order)
    await this._orderVehicleRepository.delete(orderVehicle)
    return new DeleteOrderVehicleResponse(orderVehicle.id)
  }
}