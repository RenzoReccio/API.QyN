import { Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { PurchaseOrderModel } from "src/domain/model/purchaseOrder.model";
import { ProductRepository } from "src/domain/repository/product.repository";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdatePurchaseOrderDto } from "./updatePurchaseOrder.dto";
import { UpdatePurchaseOrderResponse } from "./updatePurchaseOrder.response";

export class UpdatePurchaseOrderUseCase implements BaseUseCase<UpdatePurchaseOrderDto, UpdatePurchaseOrderResponse>{

  //Rechazado, Recibido
  orderStatusNotModifiable = new Set<number>([3, 5])

  constructor(
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository: PurchaseOrderRepository,
    @Inject('PurchaseOrderStatusRepository') private _purchaseOrderStatusRepository: PurchaseOrderStatusRepository,
    @Inject('ProductRepository') private _productRepository: ProductRepository

  ) { }

  async get(dto?: UpdatePurchaseOrderDto): Promise<UpdatePurchaseOrderResponse> {
    let purchaseOrder = await this._purchaseOrderRepository.findOne(dto.id, ['purchaseOrderStatus', 'purchaseOrderDetails', 'purchaseOrderDetails.product']);
    if (!purchaseOrder) throw new ResourceNotFound('La orden de compra indicada no se encuentra registrado');

    let status = await this._purchaseOrderStatusRepository.findOne(dto.purchaseOrderStatusId);
    if (!status) throw new ResourceNotFound('El estado indicado no se encuentra registrado');

    if (this.orderStatusNotModifiable.has(purchaseOrder.purchaseOrderStatus.id)) {
      throw new ValidationError(`La orden de compra ya esta marcada como  ${purchaseOrder.purchaseOrderStatus.name} y no puede ser modificada`)
    }

    if (dto.purchaseOrderStatusId != purchaseOrder.purchaseOrderStatus.id && dto.purchaseOrderStatusId == 5) {
      await this.updateProductsStock(purchaseOrder);
    }

    let purchaseOrderUpdate = new PurchaseOrderModel(dto.id, undefined, dto.arrivalDate, dto.comments.trim(), status, undefined);

    purchaseOrderUpdate = await this._purchaseOrderRepository.update(purchaseOrderUpdate);

    return new UpdatePurchaseOrderResponse(purchaseOrderUpdate.id)
  }

  async updateProductsStock(purchaseOrder: PurchaseOrder) {
    let productIds = new Set<number>();
    purchaseOrder.purchaseOrderDetails.forEach(item => {
      productIds.add(item.product.id)
    })
    let products = await this._productRepository.getByIds(Array.from(productIds))

    for (const purchaseOrderDetail of purchaseOrder.purchaseOrderDetails) {
      let product = products.find(item => item.id == purchaseOrderDetail.product.id);
      if (!product) continue;

      product.stock = product.stock + purchaseOrderDetail.quantity;
    }

    await this._productRepository.updateMany(products);
  }
}