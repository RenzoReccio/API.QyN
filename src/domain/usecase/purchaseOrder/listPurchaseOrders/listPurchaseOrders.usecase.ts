import { Inject } from "@nestjs/common";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListPurchaseOrdersResponse } from "./listPurchaseOrders.response";

export class ListPurchaseOrdersUseCase implements BaseUseCase<null, ListPurchaseOrdersResponse[]>{
  constructor(
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository:PurchaseOrderRepository
  ){}
  
  async get(dto?: null): Promise<ListPurchaseOrdersResponse[]> {
    let purchaseOrders  = await this._purchaseOrderRepository.findAll(['purchaseOrderStatus','supplier']);
    return purchaseOrders.map(item => {return new ListPurchaseOrdersResponse(item)});
  }

}