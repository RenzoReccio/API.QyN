import { Inject } from "@nestjs/common";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListPurchaseOrderByIdResponse } from "./listPurchaseOrderById.response";

export class ListPurchaseOrderByIdUseCase implements BaseUseCase<number, ListPurchaseOrderByIdResponse>{

  constructor(
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository: PurchaseOrderRepository
  ) { }

  async get(id: number): Promise<ListPurchaseOrderByIdResponse> {
    let purchaseOrder = await this._purchaseOrderRepository.findOne(id, ['purchaseOrderDetails', 'purchaseOrderDetails.product', 'purchaseOrderStatus']);
    return new ListPurchaseOrderByIdResponse(purchaseOrder);
  }

}