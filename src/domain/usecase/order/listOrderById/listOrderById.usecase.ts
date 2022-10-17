import { Inject, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderByIdResponse } from "./listOrderById.response";

@Injectable()
export class ListOrderByIdUseCase implements BaseUseCase<number, ListOrderByIdResponse>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(id: number): Promise<ListOrderByIdResponse> {
    let order = await this._orderRepository.findOne(id, [
      'client', 'client.typeDocument',
      'orderStatus', 
      'orderDetails', 'orderDetails.product', 'orderDetails.product.category'
    ]);
    return new ListOrderByIdResponse(order);
  }

}