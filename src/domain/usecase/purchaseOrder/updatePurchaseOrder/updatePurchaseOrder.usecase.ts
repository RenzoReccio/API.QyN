import { Inject, Injectable } from "@nestjs/common";
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

@Injectable()
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

    if (purchaseOrder.purchaseOrderStatus.id != dto.purchaseOrderStatusId) {
      this.validationStates(purchaseOrder.purchaseOrderStatus.id, dto.purchaseOrderStatusId)
    }

    if (dto.purchaseOrderStatusId != purchaseOrder.purchaseOrderStatus.id && dto.purchaseOrderStatusId == 5) {
      await this.updateProductsStockAndPrice(purchaseOrder);
    }

    let purchaseOrderUpdate = new PurchaseOrderModel(dto.id, undefined, dto.arrivalDate, dto.comments.trim(), status, undefined);

    purchaseOrderUpdate = await this._purchaseOrderRepository.update(purchaseOrderUpdate);

    return new UpdatePurchaseOrderResponse(purchaseOrderUpdate.id)
  }

  validationStates(oldState: number, newState: number) {

    if (oldState == 1 && newState != 2) throw new ValidationError('No se puede cambiar de Creado a otro estado que no sea Enviado');

    if (oldState == 2 && (newState != 3 && newState != 4)) throw new ValidationError('No se puede cambiar de Enviado a otro estado que no sea Rechazado o Aceptado');

    if (oldState == 4 && newState != 5) throw new ValidationError('No se puede cambiar de Aceptado a otro estado que no sea Recibido');
  }

  private async updateProductsStockAndPrice(purchaseOrder: PurchaseOrder) {
    let productIds = new Set<number>();
    purchaseOrder.purchaseOrderDetails.forEach(item => {
      productIds.add(item.product.id)
    })
    let products = await this._productRepository.getByIds(Array.from(productIds))

    for (const purchaseOrderDetail of purchaseOrder.purchaseOrderDetails) {
      let product = products.find(item => item.id == purchaseOrderDetail.product.id);
      if (!product) continue;

      product.stock = product.stock + purchaseOrderDetail.quantity;
      product.purchasePrice = purchaseOrderDetail.purchasePrice;
    }

    await this._productRepository.updateMany(products);
  }
}