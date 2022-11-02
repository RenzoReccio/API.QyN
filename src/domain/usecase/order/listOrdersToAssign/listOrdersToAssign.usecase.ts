import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrdersToAssignResponse } from "./listOrdersToAssign.response";

@Injectable()
export class ListOrdersToAssignUseCase implements BaseUseCase<null, ListOrdersToAssignResponse[]>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(dto?: null): Promise<ListOrdersToAssignResponse[]> {
    let orders = await this._orderRepository.findOrdersReadyToAssign(['client', 'orderStatus']);
    return orders.map(item => { return new ListOrdersToAssignResponse(item) });
  }

}