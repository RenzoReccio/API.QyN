import { Body, Controller, Post } from '@nestjs/common';
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
