import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';
import { CreateClientOrderDto } from 'src/domain/usecase/order/createClientOrder/createClientOrder.dto';
import { CreateClientOrderUseCase } from 'src/domain/usecase/order/createClientOrder/createClientOrder.usecase';
import { ListOrderByIdResponse } from 'src/domain/usecase/order/listOrderById/listOrderById.response';
import { ListOrderByIdUseCase } from 'src/domain/usecase/order/listOrderById/listOrderById.usecase';
import { ListOrderResponse } from 'src/domain/usecase/order/listOrders/listOrders.response';
import { ListOrdersUseCase } from 'src/domain/usecase/order/listOrders/listOrders.usecase';
import { ListOrderStatusResponse } from 'src/domain/usecase/order/listOrderStatus/listOrderStatus.response';
import { ListOrderStatusUseCase } from 'src/domain/usecase/order/listOrderStatus/listOrderStatus.usecase';
import { UpdateOrderDto } from 'src/domain/usecase/order/updateOrder/updateOrder.dto';
import { UpdateOrderResponse } from 'src/domain/usecase/order/updateOrder/updateOrder.response';
import { UpdateOrderUseCase } from 'src/domain/usecase/order/updateOrder/updateOrder.usecase';
import { DataStoredInToken } from 'src/utils/auth/models/auth.interface';
import { CustomResponse } from 'src/utils/response/response.model';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { BearerTokenInformation } from '../interceptor/header-token.interceptor';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private listOrdersUseCase: ListOrdersUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    private listOrderStatusUseCase: ListOrderStatusUseCase,
    private listOrderByIdUseCase: ListOrderByIdUseCase,
    private createClientOrderUseCase: CreateClientOrderUseCase
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

  @Get(':id')
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async getOrderById(@Param('id') id: number): Promise<CustomResponse<ListOrderByIdResponse>> {
    let order = await this.listOrderByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListOrderByIdResponse>(
      `Pedido con Id: ${order.id}, encontrado.`,
      order,
      null
    )
    return response;
  }

  @Post('client')
  @UseGuards(AuthenticationGuard)
  @ApiResponse({ type: OrderModel, isArray: false, status: 200 })
  async createOrderClient(@BearerTokenInformation() information: DataStoredInToken,  @Body() order: CreateClientOrderDto) {
    order.userId = Number(information.id);
    let orderInsert = await this.createClientOrderUseCase.get(order);
    let response = new CustomResponse<UpdateOrderResponse>(
      `Pedido con código: ${orderInsert.id}, creado.`,
      orderInsert,
      null
    )
    return response;
  }

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
