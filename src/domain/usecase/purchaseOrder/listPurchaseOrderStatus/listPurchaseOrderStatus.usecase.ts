import { Inject, Injectable } from "@nestjs/common";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListPurchaseOrderStatusResponse } from "./listPurchaseOrderStatus.response";

@Injectable()
export class ListPurchaseOrderStatusUseCase implements BaseUseCase<null, ListPurchaseOrderStatusResponse[]>{
  constructor(
    @Inject('PurchaseOrderStatusRepository') private _purchaseOrderStatusRepository: PurchaseOrderStatusRepository,
  ) { }

  async get(dto?: null): Promise<ListPurchaseOrderStatusResponse[]> {
    let status = await this._purchaseOrderStatusRepository.findAll();
    return status.map(item => { return new ListPurchaseOrderStatusResponse(item) });
  }
}