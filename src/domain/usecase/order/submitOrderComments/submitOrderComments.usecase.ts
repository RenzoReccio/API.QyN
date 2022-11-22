import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { OrderModel } from "src/domain/model/order.model";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { SubmitOrderCommentsDto } from "./submitOrderComments.dto";
import { SubmitOrderCommentsResponse } from "./submitOrderComments.response";

@Injectable()
export class SubmitOrderCommentsUseCase implements BaseUseCase<SubmitOrderCommentsDto, SubmitOrderCommentsResponse>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository
  ) { }

  async get(dto: SubmitOrderCommentsDto): Promise<SubmitOrderCommentsResponse> {
    let order = await this._orderRepository.findOne(dto.id, ['orderStatus']);
    if (!order) throw new ResourceNotFound('La orden indicada no existe');

    if(order.orderStatus.id != 7) throw new ValidationError('El pedido tiene que haber sido entregado para poder puntuarlo.')

    let orderModel = new OrderModel(
      dto.id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      dto.punctuation,
      dto.commentsOnOrder,
    );
    await this._orderRepository.update(orderModel)

    return new SubmitOrderCommentsResponse(orderModel);
  }
}