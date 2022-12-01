import { Inject } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { ProductRepository } from "src/domain/repository/product.repository";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListForDashboardResponse, ListProductsResponse, OrderForDashboardResponse, ProductListForDashboardResponse, PurchaseOrderForDashboardResponse, SimpleList } from "./listForDashboard.response";

export class ListForDashboardUseCase implements BaseUseCase<null, ListForDashboardResponse>{

  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository,
    @Inject('PurchaseOrderRepository') private _purchaseOrderRepository: PurchaseOrderRepository,
    @Inject('PurchaseOrderStatusRepository') private _purchaseOrderStatusRepository: PurchaseOrderStatusRepository,
  ) { }

  async get(dto?: null): Promise<ListForDashboardResponse> {
    let products = await this._productRepository.findAll();
    let orders = await this._orderRepository.findAll(['orderStatus']);
    let orderStatus = await this._orderStatusRepository.findAll();

    let purchaseOrders = await this._purchaseOrderRepository.findAll(['purchaseOrderStatus']);
    let purchaseOrderStatus = await this._purchaseOrderStatusRepository.findAll();

    let response = new ListForDashboardResponse();
    response.product = new ProductListForDashboardResponse();
    response.product.total = products.length;
    response.product.productsWithoutStock = products.filter(item => item.stock < item.minStock).map(item => { return new ListProductsResponse(item) });
    response.product.productsInCatalog = products.filter(item => item.showInCatalog).map(item => { return new ListProductsResponse(item) });

    response.order = new OrderForDashboardResponse();
    response.order.totalOfOrdersFinished = orders.filter(item => item.orderStatus.id == 7).length
    response.order.orderByState = orderStatus.map<SimpleList>(orderStatusItem => {
      return {
        name: orderStatusItem.name, 
        total: orders.filter(item => item.orderStatus.id == orderStatusItem.id).length
      }
    })

    response.purchaseOrder = new PurchaseOrderForDashboardResponse();
    response.purchaseOrder.total = purchaseOrders.length
    response.purchaseOrder.purchaseOrderByState = purchaseOrderStatus.map<SimpleList>(statusItem => {
      return {
        name: statusItem.name,
        total: purchaseOrders.filter(item => item.purchaseOrderStatus.id == statusItem.id).length
      }
    })

    return response;
  }

}