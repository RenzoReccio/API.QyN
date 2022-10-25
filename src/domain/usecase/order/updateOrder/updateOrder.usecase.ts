import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { OrderModel } from "src/domain/model/order.model";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateOrderDto } from "./updateOrder.dto";
import { UpdateOrderResponse } from "./updateOrder.response";

@Injectable()
export class UpdateOrderUseCase implements BaseUseCase<UpdateOrderDto, UpdateOrderResponse>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository
  ) { }

  async get(dto: UpdateOrderDto): Promise<UpdateOrderResponse> {

    let orderStatus = await this._orderStatusRepository.findOne(dto.statusId);
    if (!orderStatus) throw new ResourceNotFound('El estado dado no se encuentra registrado');

    let orderToUpdate = await this._orderRepository.findOne(dto.id);
    if (!orderToUpdate) throw new ResourceNotFound('El pedido solicitado no se encuentra registrado');

    let orderModel = new OrderModel(
      dto.id,
      undefined,
      orderStatus,
      dto.address,
      dto.estimatedDate,
      dto.comments,
      undefined
    );
    await this._orderRepository.update(orderModel)

    return new UpdateOrderResponse(orderModel);
  }
}