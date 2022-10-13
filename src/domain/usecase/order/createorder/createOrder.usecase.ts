import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { OrderModel } from "src/domain/model/order.model";
import { ClientRepository } from "src/domain/repository/client.repository";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderDetailRepository } from "src/domain/repository/orderDetail.repository";
import { CreateOrderDto } from "./createOrder.dto";

export class CreateOrderUseCase {
  constructor(
    public readonly createOrderDto: CreateOrderDto,
  ) { }
}

@CommandHandler(CreateOrderUseCase)
export class CreateOrderUseCaseHandler implements ICommandHandler<CreateOrderUseCase> {
  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('OrderDetailRepository') private _orderDetailRepository: OrderDetailRepository,
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
  ) { }

  async execute(command: CreateOrderUseCase) {
    let { createOrderDto } = command;
    let clientFind = await this._clientRepository.findByRuc(createOrderDto.rucClient.trim());
    // if (!clientFind) {
    //   let clientInsert = new ClientModel(
    //     null, createOrderDto.rucClient, createOrderDto.nameClient, 'Sin especificar',
    //     createOrderDto.phoneClient, createOrderDto.emailClient, [], []
    //   );
    //   clientFind = await this._clientRepository.insert(clientInsert);
    // }

    var estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);

    // let orderInsert = new OrderModel(
    //   null, clientFind, , createOrderDto.address, estimatedDate, createOrderDto.comments, []
    // );


    // orderInsert = await this._orderRepository.insert(orderInsert);
    // let orderDetailInsert: OrderDetailModel[] = [];
    // for (const orderDetail of createOrderDto.orderDetail) {
    //   let product = new ProductModel(orderDetail.idProduct, null, null, null, null, null, null, null, null)
    //   let order = new OrderModel(orderInsert.id, null, null, null, null, null, null);
    //   orderDetailInsert.push(new OrderDetailModel(null, order, product, orderDetail.quantity));
    // }

    // orderDetailInsert = await this._orderDetailRepository.insertMany(orderDetailInsert);

    // orderInsert.orderDetails = orderDetailInsert;

    return {};
  }
}
