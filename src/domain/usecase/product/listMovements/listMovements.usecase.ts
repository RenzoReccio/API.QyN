import { Inject } from "@nestjs/common";
import { OrderDetailRepository } from "src/domain/repository/orderDetail.repository";
import { ProductRepository } from "src/domain/repository/product.repository";
import { PurchaseOrderDetailRepository } from "src/domain/repository/purchaseOrderDetail.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListMovementsResponse } from "./listMovements.response";

export class ListMovementsUseCase implements BaseUseCase<number, ListMovementsResponse[]>{

  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
    @Inject('OrderDetailRepository') private _orderDetailRepository: OrderDetailRepository,
    @Inject('PurchaseOrderDetailRepository') private _purchaseOrderDetailRepository: PurchaseOrderDetailRepository,

  ) { }

  async get(idProduct?: number): Promise<ListMovementsResponse[]> {
    let outputs = await this._orderDetailRepository.listByProductId(idProduct);
    let inputs = await this._purchaseOrderDetailRepository.listByProductId(idProduct);
    let movements: ListMovementsResponse[] = [];
    movements.push(...inputs.map(item => { return new ListMovementsResponse(item.purchaseOrder.updatedAt, 'Ingreso', item.quantity) }))
    movements.push(...outputs.map(item => { return new ListMovementsResponse(item.order.updatedAt, 'Salida', item.quantity) }))

    movements.sort((a, b) => a.date.getTime() - b.date.getTime())
    return movements;
  }

}