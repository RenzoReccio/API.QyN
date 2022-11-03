import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderVehicleDto } from 'src/domain/usecase/orderVehicle/createOrderVehicle/createOrderVehicle.dto';
import { CreateOrderVehicleResponse } from 'src/domain/usecase/orderVehicle/createOrderVehicle/createOrderVehicle.response';
import { CreateOrderVehicleUseCase } from 'src/domain/usecase/orderVehicle/createOrderVehicle/createOrderVehicle.usecase';
import { DeleteOrderVehicleResponse } from 'src/domain/usecase/orderVehicle/deleteOrderVehicle/deleteOrderVehicle.response';
import { DeleteOrderVehicleUseCase } from 'src/domain/usecase/orderVehicle/deleteOrderVehicle/deleteOrderVehicle.usecase';
import { ListOrderVehicleByVehicleIdResponse } from 'src/domain/usecase/orderVehicle/listOrderVehicleByVehicleId/listOrderVehicleByVehicleId.response';
import { ListOrderVehicleByVehicleIdUseCase } from 'src/domain/usecase/orderVehicle/listOrderVehicleByVehicleId/listOrderVehicleByVehicleId.usecase';
import { CreateSupplierResponse } from 'src/domain/usecase/supplier/createSupplier/createSupplier.response';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('orderVehicle')
@ApiTags('orderVehicle')
export class OrderVehicleController {
  constructor(
    private listOrderVehicleByVehicleIdUseCase: ListOrderVehicleByVehicleIdUseCase,
    private createOrderVehicleUseCase: CreateOrderVehicleUseCase,
    private deleteOrderVehicleUseCase: DeleteOrderVehicleUseCase
  ){}

  @Get(':vehicleId')
  @ApiResponse({ type: ListOrderVehicleByVehicleIdResponse, isArray: true, status: 200 })
  async getOrderVehicleByVehicleId(@Param('vehicleId') vehicleId: number) {
    let orderVehicle = await this.listOrderVehicleByVehicleIdUseCase.get(Number(vehicleId));
    let response = new CustomResponse<ListOrderVehicleByVehicleIdResponse[]>(
      `Pedidos encontrados: ${orderVehicle.length}.`,
      orderVehicle,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreateOrderVehicleResponse, isArray: false, status: 200 })
  async createOrderVehicle(@Body() orderVehicle: CreateOrderVehicleDto) {
    let orderVehicleInsert = await this.createOrderVehicleUseCase.get(orderVehicle);
    let response = new CustomResponse<CreateSupplierResponse>(
      `Pedido asignado con vehiculo.`,
      orderVehicleInsert,
      null
    )
    return response;
  }

  @Delete(':id')
  @ApiResponse({ type: DeleteOrderVehicleResponse, isArray: true, status: 200 })
  async deleteOrderVehicle(@Param('id') id: number) {
    let orderVehicle = await this.deleteOrderVehicleUseCase.get(Number(id));
    let response = new CustomResponse<DeleteOrderVehicleResponse>(
      `Asignacion eliminada: ${orderVehicle.id}.`,
      orderVehicle,
      null
    )

    return response;
  }
}