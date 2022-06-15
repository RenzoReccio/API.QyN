import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';
import { CreateOrderDto } from 'src/domain/usecase/dto/order.dto';
import { OrderUseCase } from 'src/domain/usecase/order.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase
  ) {
  }

  @Get('')
  @ApiResponse({ type: OrderModel, isArray: true, status: 200 })
  async getProducts() {
    let orders = await this.orderUseCase.getOrders();
    let response = new CustomResponse<OrderModel[]>(
      `Pedidos encontrados: ${orders.length}.`,
      orders,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async insertOrder(@Body() order: CreateOrderDto): Promise<CustomResponse<OrderModel>> {
    let orderInsert = await this.orderUseCase.createOrder(order);
    let response = new CustomResponse<OrderModel>(
      `Pedido con código: ${orderInsert.id}, registrado.`,
      orderInsert,
      null
    )
    return response;
  }
}
