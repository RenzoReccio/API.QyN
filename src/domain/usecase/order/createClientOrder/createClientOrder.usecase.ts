import { Inject } from "@nestjs/common";
import { NoStock } from "src/domain/error/noStock.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { OrderModel } from "src/domain/model/order.model";
import { OrderDetailModel } from "src/domain/model/orderDetail.model";
import { ClientRepository } from "src/domain/repository/client.repository";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderDetailRepository } from "src/domain/repository/orderDetail.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateClientOrderDto } from "./createClientOrder.dto";
import { CreateClientOrderResponse } from "./createClientOrder.response";

export class CreateClientOrderUseCase implements BaseUseCase<CreateClientOrderDto, CreateClientOrderResponse>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderDetailRepository') private _orderDetailRepository: OrderDetailRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository,
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
    @Inject('ProductRepository') private _productRepository: ProductRepository
  ) {

  }

  async get(dto?: CreateClientOrderDto): Promise<CreateClientOrderResponse> {
    let orderStatusCreated = await this._orderStatusRepository.findOne(1);
    if (!orderStatusCreated) throw new ResourceNotFound('El estado dado no se encuentra registrado');

    let clientAssociated = await this._clientRepository.findByUserId(dto.userId)
    if (!clientAssociated) throw new ResourceNotFound('El usuario no tiene un cliente asociado');

    let order = new OrderModel(null, clientAssociated, orderStatusCreated, dto.address, new Date(), dto.comments, undefined)
    order = await this._orderRepository.insert(order);

    let productIds = new Set<number>();
    dto.orderDetail.forEach(item => {
      productIds.add(item.idProduct)
    })
    let products = await this._productRepository.getByIds(Array.from(productIds))
    let orderDetailInsert: OrderDetailModel[] = [];
    for (const orderDetail of dto.orderDetail) {
      let product = products.find(item => item.id = orderDetail.idProduct);

      if(orderDetail.quantity > product.stock) throw new NoStock('No hay stock suficiente del producto: ' + product.name)
      orderDetailInsert.push(new OrderDetailModel(null, order, product, orderDetail.quantity, product.salesPrice));
      product.stock = product.stock - orderDetail.quantity;
    }

    await this._productRepository.updateMany(products);
    //Insert
    order = await this._orderRepository.insert(order);
    await this._orderDetailRepository.insertMany(orderDetailInsert);

    return new CreateClientOrderResponse(order.id)
    
  }


}