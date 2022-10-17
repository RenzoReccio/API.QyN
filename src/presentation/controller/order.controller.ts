import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';
// import { CreateOrderDto } from 'src/domain/usecase/order/createOrder/createOrder.dto';
// import { CreateOrderUseCase } from 'src/domain/usecase/order/createOrder/createOrder.usecase';
import { ListOrderResponse } from 'src/domain/usecase/order/listOrders/listOrders.response';
import { ListOrdersUseCase } from 'src/domain/usecase/order/listOrders/listOrders.usecase';
import { UpdateOrderDto } from 'src/domain/usecase/order/updateOrder/updateOrder.dto';
import { UpdateOrderResponse } from 'src/domain/usecase/order/updateOrder/updateOrder.response';
import { UpdateOrderUseCase } from 'src/domain/usecase/order/updateOrder/updateOrder.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    // private createOrderUseCase: CreateOrderUseCase,
    private listOrdersUseCase: ListOrdersUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,

  ) {
  }

  @Get('')
  @ApiResponse({ type: ListOrderResponse, isArray: true, status: 200 })
  async getOrders() {
    let orders = await this.listOrdersUseCase.get();
    let response = new CustomResponse<ListOrderResponse[]>(
      `Pedidos encontrados: ${orders.length}.`,
      orders,
      null
    )
    return response;
  }

  // @Get('states')
  // @ApiResponse({ type: String, isArray: true, status: 200 })
  // async getOrderStates() {
  //   let states = await this.orderUseCase.getOrdersStates();
  //   let response = new CustomResponse<string[]>(
  //     `Estados encontrados: ${states.length}.`,
  //     states,
  //     null
  //   )
  //   return response;
  // }

  // @Get(':id')
  // @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  // async getOrderById(@Param('id') id: number): Promise<CustomResponse<OrderModel>> {
  //   let client = await this.orderUseCase.getOrderById(id);
  //   let response = new CustomResponse<OrderModel>(
  //     `Pedido con Id: ${client.id}, encontrado.`,
  //     client,
  //     null
  //   )
  //   return response;
  // }


  // @Post('')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  // async insertOrder(@Body() order: CreateOrderDto): Promise<CustomResponse<OrderModel>> {
  //   let orderInsert = await this.createOrderUseCase.get(order);
  //   let response = new CustomResponse<OrderModel>(
  //     `Pedido con código: ${orderInsert.id}, registrado.`,
  //     orderInsert,
  //     null
  //   )
  //   return response;
  // }

  @Put(':id')
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto): Promise<CustomResponse<UpdateOrderResponse>> {
    order.id = Number(id);
    let orderUpdate = await this.updateOrderUseCase.get(order);
    let response = new CustomResponse<UpdateOrderResponse>(
      `Pedido con código: ${orderUpdate.id}, actualizado.`,
      orderUpdate,
      null
    )
    return response;
  }
}
