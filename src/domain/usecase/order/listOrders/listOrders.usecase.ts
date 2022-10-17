import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderResponse } from "./listOrders.response";

@Injectable()
export class ListOrdersUseCase implements BaseUseCase<null, ListOrderResponse[]>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(dto?: null): Promise<ListOrderResponse[]> {
    let orders = await this._orderRepository.findAll(['client', 'orderStatus']);
    return orders.map(item => { return new ListOrderResponse(item) });
  }

}