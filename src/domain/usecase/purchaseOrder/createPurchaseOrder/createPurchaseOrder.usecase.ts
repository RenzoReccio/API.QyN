import { Inject } from "@nestjs/common";
import { ProductModel } from "src/domain/model/product.model";
import { PurchaseOrderModel } from "src/domain/model/purchaseOrder.model";
import { PurchaseOrderDetailModel } from "src/domain/model/purchaseOrderDetail.model";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { PurchaseOrderDetailRepository } from "src/domain/repository/purchaseOrderDetail.repository";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreatePurchaseOrderDto } from "./createPurchaseOrder.dto";
import { CreatePurchaseOrderResponse } from "./createPurchaseOrder.response";
import { ProductRepository } from "src/domain/repository/product.repository";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { PurchaseOrderMailRepository } from "src/domain/repository/purchaseOrderMail.repository";

export class CreatePurchaseOrderUseCase implements BaseUseCase<CreatePurchaseOrderDto, CreatePurchaseOrderResponse>{
  constructor(
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository: PurchaseOrderRepository,
    @Inject('PurchaseOrderDetailRepository') private _purchaseOrderDetailRepository: PurchaseOrderDetailRepository,
    @Inject('PurchaseOrderStatusRepository') private _purchaseOrderStatusRepository: PurchaseOrderStatusRepository,
    @Inject('SupplierRepository') private _supplierRepository: SupplierRepository,
    @Inject('ProductRepository') private _productRepository: ProductRepository,
    @Inject('PurchaseOrderMailRepository') private _purchaseOrderMailRepository: PurchaseOrderMailRepository,
  ) { }

  async get(dto?: CreatePurchaseOrderDto): Promise<CreatePurchaseOrderResponse> {

    let status = await this._purchaseOrderStatusRepository.findOne(1);
    if (!status) throw new ResourceNotFound('El estado indicado no se encuentra registrado');

    let supplier = await this._supplierRepository.findOne(dto.supplierId);
    if (!supplier) throw new ResourceNotFound('El proveedor indicado no se encuentra registrado');

    let purchaseOrder = new PurchaseOrderModel(undefined, supplier, dto.arrivalDate, dto.comments, status, undefined);
    let purchaseOrderDetail: PurchaseOrderDetailModel[] = []

    let productIds = new Set<number>();

    dto.purchaseOrderDetails.forEach(item => {
      productIds.add(item.productId)
    })
    let products = await this._productRepository.getByIds(Array.from(productIds))

    for (const detail of dto.purchaseOrderDetails) {
      let product = products.find(item => item.id = detail.productId);

      purchaseOrderDetail.push(
        new PurchaseOrderDetailModel(undefined,
          purchaseOrder,
          product,
          detail.purchasePrice,
          detail.quantity
        )
      )
    }

    purchaseOrder = await this._purchaseOrderRepository.insert(purchaseOrder);
    purchaseOrderDetail.forEach(item => {
      item.purchaseOrder = purchaseOrder;
    })
    await this._purchaseOrderDetailRepository.insertMany(purchaseOrderDetail);
    await this._purchaseOrderMailRepository.sendMailToSupplier(supplier, purchaseOrder, purchaseOrderDetail);
    return new CreatePurchaseOrderResponse(purchaseOrder.id)
  }

}