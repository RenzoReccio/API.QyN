import { Inject } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrdersPunctuationResponse } from "./listOrdersPunctutation.response";

export class ListOrdersPunctuationUseCase implements BaseUseCase<null, ListOrdersPunctuationResponse[]>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(dto?: null): Promise<ListOrdersPunctuationResponse[]> {
    let orders = await this._orderRepository.findAllOrderDelivered();
    let actualYear = (new Date()).getFullYear();
    let actualMonth = (new Date()).getMonth();

    let ordersOfMonth = orders.filter(item => item.createdAt.getMonth() == actualMonth && item.updatedAt.getFullYear() == actualYear)

    let ordersPuncutation: ListOrdersPunctuationResponse[] = []
    for (let index = 1; index <= 5; index++) {
      let quantity: number = 0;
      ordersOfMonth.forEach(item => {
        if (item.punctuation == index) quantity++;
      });
      ordersPuncutation.push(new ListOrdersPunctuationResponse(index, quantity))
    }
    return ordersPuncutation;
  }
}