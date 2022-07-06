import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';
import { CreateOrderDto, UpdateOrderDto } from 'src/domain/usecase/dto/order.dto';
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
  async getOrders() {
    let orders = await this.orderUseCase.getOrders();
    let response = new CustomResponse<OrderModel[]>(
      `Pedidos encontrados: ${orders.length}.`,
      orders,
      null
    )
    return response;
  }

  @Get('states')
  @ApiResponse({ type: String, isArray: true, status: 200 })
  async getOrderStates() {
    let states = await this.orderUseCase.getOrdersStates();
    let response = new CustomResponse<string[]>(
      `Estados encontrados: ${states.length}.`,
      states,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async getOrderById(@Param('id') id: number): Promise<CustomResponse<OrderModel>> {
    let client = await this.orderUseCase.getOrderById(id);
    let response = new CustomResponse<OrderModel>(
      `Pedido con Id: ${client.id}, encontrado.`,
      client,
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

  @Put(':id')
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto): Promise<CustomResponse<OrderModel>> {
    let orderInsert = await this.orderUseCase.updateOrder(order, Number(id));
    let response = new CustomResponse<OrderModel>(
      `Pedido con código: ${orderInsert.id}, actualizado.`,
      orderInsert,
      null
    )
    return response;
  }
}
