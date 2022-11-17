import { Inject, Injectable } from "@nestjs/common";
import { OrderStatusHistoryRepository } from "src/domain/repository/orderStatusHistory.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderStatusHistoryResponse } from "./listOrderStatusHistory.response";

@Injectable()
export class ListOrderStatusHistoryUseCase implements BaseUseCase<number, ListOrderStatusHistoryResponse[]>{
  constructor(
    @Inject('OrderStatusHistoryRepository') private _orderStatusHistoryRepository: OrderStatusHistoryRepository,
  ) { }

  async get(orderId: number): Promise<ListOrderStatusHistoryResponse[]> {
    let statusHistory = await this._orderStatusHistoryRepository.findByOrderId(orderId, ['orderStatus']);
    return statusHistory.map(item => { return new ListOrderStatusHistoryResponse(item) });
  }
}