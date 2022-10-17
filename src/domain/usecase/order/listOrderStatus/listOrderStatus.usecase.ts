import { Inject } from "@nestjs/common";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrderStatusResponse } from "./listOrderStatus.response";

export class ListOrderStatusUseCase implements BaseUseCase<null, ListOrderStatusResponse[]>{
  constructor(
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository,
  ) { }

  async get(dto?: null): Promise<ListOrderStatusResponse[]> {
    let status = await this._orderStatusRepository.findAll();
    return status.map(item => { return new ListOrderStatusResponse(item) });
  }
}