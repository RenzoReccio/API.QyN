import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { Order } from "src/domain/model/interface/order.interface";
import { OrderModel } from "src/domain/model/order.model";
import { OrderStatusHistoryModel } from "src/domain/model/orderStatusHistory.model";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { OrderStatusHistoryRepository } from "src/domain/repository/orderStatusHistory.repository";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateOrderDto } from "./updateOrder.dto";
import { UpdateOrderResponse } from "./updateOrder.response";

@Injectable()
export class UpdateOrderUseCase implements BaseUseCase<UpdateOrderDto, UpdateOrderResponse>{

  //Rechazado, Entregado
  orderStatusNotModifiable = new Set<number>([2, 7])

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderStatusRepository') private _orderStatusRepository: OrderStatusRepository,
    @Inject('ProductRepository') private _productRepository: ProductRepository,
    @Inject('OrderStatusHistoryRepository') private _orderStatusHistoryRepository: OrderStatusHistoryRepository,
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
  ) { }

  async get(dto: UpdateOrderDto): Promise<UpdateOrderResponse> {
    let order = await this._orderRepository.findOne(dto.id, ['orderStatus', 'orderDetails', 'orderDetails.product']);
    if (!order) throw new ResourceNotFound('El pedido indicado no se encuentra registrado');

    let orderStatus = await this._orderStatusRepository.findOne(dto.statusId);
    if (!orderStatus) throw new ResourceNotFound('El estado dado no se encuentra registrado');

    let orderToUpdate = await this._orderRepository.findOne(dto.id);
    if (!orderToUpdate) throw new ResourceNotFound('El pedido solicitado no se encuentra registrado');

    if (this.orderStatusNotModifiable.has(order.orderStatus.id)) {
      throw new ValidationError(`El pedido ya esta marcado como  ${order.orderStatus.name} y no puede ser modificado`)
    }

    if (dto.statusId != order.orderStatus.id) {
      await this._orderStatusHistoryRepository.insert(new OrderStatusHistoryModel(undefined, order, orderStatus));
      await this.validationStates(order.id, order.orderStatus.id, dto.statusId)
    }
    //Si el pedido es rechazado actualizamos el stock
    if (dto.statusId != order.orderStatus.id && dto.statusId == 2) {
      await this.updateProductsStock(order);
    }

    let orderModel = new OrderModel(
      dto.id,
      undefined,
      orderStatus,
      dto.address,
      dto.estimatedDate,
      dto.comments,
      undefined
    );
    await this._orderRepository.update(orderModel)

    return new UpdateOrderResponse(orderModel);
  }

  async validationStates(orderId: number, oldState: number, newState: number) {
    if (oldState == 1 && (newState != 3 && newState != 2)) throw new ValidationError('No se puede cambiar de creado a otro estado que no sea aceptado o rechazado');

    if (oldState == 3 && newState != 4) throw new ValidationError('No se puede cambiar de Aceptado a otro estado que no sea En preparacion');

    if (oldState == 4 && newState != 5) throw new ValidationError('No se puede cambiar de En preparacion a otro estado que no sea Listo para enviar');

    if (oldState == 5 && newState != 6) throw new ValidationError('No se puede cambiar de Listo para enviar a otro estado que no sea En camino');

    if (oldState == 6 && newState != 7) throw new ValidationError('No se puede cambiar de En camino a otro estado que no sea Entregado');

    if (oldState == 4 && newState == 5) {
      let orderVehicle = await this._orderVehicleRepository.findByOrderId(orderId)
      if (!orderVehicle) {
        throw new ValidationError('Se debe asignar un vehiculo al pedido para poder cambiar al siguiente estado');
      }
    }
  }

  async updateProductsStock(order: Order) {
    let productIds = new Set<number>();
    order.orderDetails.forEach(item => {
      productIds.add(item.product.id)
    })
    let products = await this._productRepository.getByIds(Array.from(productIds))

    for (const orderDetail of order.orderDetails) {
      let product = products.find(item => item.id == orderDetail.product.id);
      if (!product) continue;

      product.stock = product.stock + orderDetail.quantity;
    }

    await this._productRepository.updateMany(products);
  }
}