import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';
import { ListOrderResponse } from 'src/domain/usecase/order/listOrders/listOrders.response';
import { ListOrdersUseCase } from 'src/domain/usecase/order/listOrders/listOrders.usecase';
import { ListOrderStatusResponse } from 'src/domain/usecase/order/listOrderStatus/listOrderStatus.response';
import { ListOrderStatusUseCase } from 'src/domain/usecase/order/listOrderStatus/listOrderStatus.usecase';
import { UpdateOrderDto } from 'src/domain/usecase/order/updateOrder/updateOrder.dto';
import { UpdateOrderResponse } from 'src/domain/usecase/order/updateOrder/updateOrder.response';
import { UpdateOrderUseCase } from 'src/domain/usecase/order/updateOrder/updateOrder.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private listOrdersUseCase: ListOrdersUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    private listOrderStatusUseCase: ListOrderStatusUseCase
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

  @Get('status')
  @ApiResponse({ type: ListOrderStatusResponse, isArray: true, status: 200 })
  async getOrderStates() {
    let status = await this.listOrderStatusUseCase.get();
    let response = new CustomResponse<ListOrderStatusResponse[]>(
      `Estados encontrados: ${status.length}.`,
      status,
      null
    )
    return response;
  }

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
