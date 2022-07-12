import { Inject, Injectable } from "@nestjs/common";
import { StatusOrderEnum } from "src/data/typeorm/enum/order.enum";
import { ResourceNotFound } from "../error/resourceNotFound.exception";
import { ClientModel } from "../model/client.model";
import { OrderModel } from "../model/order.model";
import { OrderDetailModel } from "../model/orderDetail.model";
import { ProductModel } from "../model/product.model";
import { ClientRepository } from "../repository/client.repository";
import { OrderRepository } from "../repository/order.repository";
import { OrderDetailRepository } from "../repository/orderDetail.repository";
import { CreateOrderDto, UpdateOrderDto } from "./dto/order.dto";

@Injectable()
export class OrderUseCase {
  private _orderRepository: OrderRepository;
  private _orderDetailRepository: OrderDetailRepository;
  private _clientRepository: ClientRepository;
  constructor(
    @Inject('OrderRepository') orderRepository: OrderRepository,
    @Inject('OrderDetailRepository') orderDetailRepository: OrderDetailRepository,
    @Inject('ClientRepository') clientRepository: ClientRepository,

  ) {
    this._orderRepository = orderRepository;
    this._orderDetailRepository = orderDetailRepository;
    this._clientRepository = clientRepository;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    let clientFind = await this._clientRepository.findByRuc(createOrderDto.rucClient.trim());
    if (!clientFind) {
      let clientInsert = new ClientModel(
        null, createOrderDto.rucClient, createOrderDto.nameClient, 'Sin especificar',
        createOrderDto.phoneClient, createOrderDto.emailClient, [], []
      );
      clientFind = await this._clientRepository.insert(clientInsert);
    }

    var estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);

    let orderInsert = new OrderModel(
      null, clientFind, StatusOrderEnum.CREADO, estimatedDate, createOrderDto.comments, []
    );


    orderInsert = await this._orderRepository.insert(orderInsert);
    let orderDetailInsert: OrderDetailModel[] = [];
    for (const orderDetail of createOrderDto.orderDetail) {
      let product = new ProductModel(orderDetail.idProduct, null, null, null, null, null, null, null, null)
      let order = new OrderModel(orderInsert.id, null, null, null, null, null);
      orderDetailInsert.push(new OrderDetailModel(null, order, product, orderDetail.quantity));
    }

    orderDetailInsert = await this._orderDetailRepository.insertMany(orderDetailInsert);

    orderInsert.orderDetails = orderDetailInsert;

    return orderInsert;
  }

  async getOrders() {
    return await this._orderRepository.findAll(['client']);
  }

  async getOrdersStates() {
    return await this._orderRepository.getStates();
  }

  async getOrderById(id: number) {
    return await this._orderRepository.findOne(id, ['client','orderDetails', 'orderDetails.product'])
  }

  async updateOrder(updateOrderDto: UpdateOrderDto, idOrder: number): Promise<OrderModel> {
    let orderUpdate = new OrderModel(
      idOrder, undefined, updateOrderDto.status, undefined, updateOrderDto.comments, undefined
    );

    let orderExist = await this._orderRepository.findOne(orderUpdate.id);

    if (!orderExist) throw new ResourceNotFound('No existe la orden con el id indicado');

    return await this._orderRepository.update(orderUpdate);
  }
}