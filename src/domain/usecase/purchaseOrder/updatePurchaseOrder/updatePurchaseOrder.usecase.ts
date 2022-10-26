import { Inject } from "@nestjs/common";
import { PurchaseOrderModel } from "src/domain/model/purchaseOrder.model";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdatePurchaseOrderDto } from "./updatePurchaseOrder.dto";
import { UpdatePurchaseOrderResponse } from "./updatePurchaseOrder.response";

export class UpdatePurchaseOrderUseCase implements BaseUseCase<UpdatePurchaseOrderDto, UpdatePurchaseOrderResponse>{

  constructor(
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository: PurchaseOrderRepository,
    @Inject('PurchaseOrderStatusRepository') private _purchaseOrderStatusRepository: PurchaseOrderStatusRepository,

  ) { }

  async get(dto?: UpdatePurchaseOrderDto): Promise<UpdatePurchaseOrderResponse> {
    let status = await this._purchaseOrderStatusRepository.findOne(dto.purchaseOrderStatusId);

    let purchaseOrder = new PurchaseOrderModel(dto.id, undefined, dto.arrivalDate, dto.comments, status, undefined);

    purchaseOrder = await this._purchaseOrderRepository.update(purchaseOrder);

    return new UpdatePurchaseOrderResponse(purchaseOrder.id)
  }
}