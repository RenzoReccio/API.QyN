import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderByUserIdResponse } from "./listOrdersByUserId.response";

@Injectable()
export class ListOrdersByUserIdUseCase implements BaseUseCase<number, ListOrderByUserIdResponse[]>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(UserId: number): Promise<ListOrderByUserIdResponse[]> {
    let orders = await this._orderRepository.findByUserId(UserId, [
      'orderStatus',
      'orderDetails', 'orderDetails.product', 'orderDetails.product.category'
    ]);
    return orders.map(item => { return new ListOrderByUserIdResponse(item) });
  }

}