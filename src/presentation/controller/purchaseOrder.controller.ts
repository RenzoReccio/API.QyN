import { Body, Controller, Get, Param } from "@nestjs/common";
import { Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePurchaseOrderDto } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.dto";
import { CreatePurchaseOrderResponse } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.response";
import { CreatePurchaseOrderUseCase } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.usecase";
import { ListPurchaseOrderByIdResponse } from "src/domain/usecase/purchaseOrder/listPurchaseOrderById/listPurchaseOrderById.response";
import { ListPurchaseOrderByIdUseCase } from "src/domain/usecase/purchaseOrder/listPurchaseOrderById/listPurchaseOrderById.usecase";
import { ListPurchaseOrdersResponse } from "src/domain/usecase/purchaseOrder/listPurchaseOrders/listPurchaseOrders.response";
import { ListPurchaseOrdersUseCase } from "src/domain/usecase/purchaseOrder/listPurchaseOrders/listPurchaseOrders.usecase";
import { ListPurchaseOrderStatusResponse } from "src/domain/usecase/purchaseOrder/listPurchaseOrderStatus/listPurchaseOrderStatus.response";
import { ListPurchaseOrderStatusUseCase } from "src/domain/usecase/purchaseOrder/listPurchaseOrderStatus/listPurchaseOrderStatus.usecase";
import { UpdatePurchaseOrderDto } from "src/domain/usecase/purchaseOrder/updatePurchaseOrder/updatePurchaseOrder.dto";
import { UpdatePurchaseOrderResponse } from "src/domain/usecase/purchaseOrder/updatePurchaseOrder/updatePurchaseOrder.response";
import { UpdatePurchaseOrderUseCase } from "src/domain/usecase/purchaseOrder/updatePurchaseOrder/updatePurchaseOrder.usecase";
import { CustomResponse } from "src/utils/response/response.model";

@Controller('purchaseorder')
@ApiTags('purchaseorder')
export class PurchaseOrderController {
  constructor(
    private listPurchaseOrdersUseCase: ListPurchaseOrdersUseCase,
    private listPurchaseOrderByIdUseCase: ListPurchaseOrderByIdUseCase,
    private createPurchaseOrderUseCase: CreatePurchaseOrderUseCase,
    private updatePurchaseOrderUseCase: UpdatePurchaseOrderUseCase,
    private listPurchaseOrderStatusUseCase: ListPurchaseOrderStatusUseCase,

  ) { }

  @Get('status')
  @ApiResponse({ type: ListPurchaseOrderStatusResponse, isArray: true, status: 200 })
  async getPurchaseOrderStates() {
    let status = await this.listPurchaseOrderStatusUseCase.get();
    let response = new CustomResponse<ListPurchaseOrderStatusResponse[]>(
      `Estados encontrados: ${status.length}.`,
      status,
      null
    )
    return response;
  }

  @Get('')
  @ApiResponse({ type: ListPurchaseOrdersResponse, isArray: true, status: 200 })
  async getPurchaseOrder() {
    let purchaseOrders = await this.listPurchaseOrdersUseCase.get();
    let response = new CustomResponse<ListPurchaseOrdersResponse[]>(
      `Ordenes de compras encontrados: ${purchaseOrders.length}.`,
      purchaseOrders,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ListPurchaseOrderByIdResponse, isArray: false, status: 200 })
  async getPurchaseOrderById(@Param('id') id: string) {
    let purchaseOrder = await this.listPurchaseOrderByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListPurchaseOrderByIdResponse>(
      `Orden de compra con id: ${purchaseOrder.id} encontrado.`,
      purchaseOrder,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreatePurchaseOrderResponse, isArray: false, status: 200 })
  async createPurchaseOrder(@Body() purchaseOrder: CreatePurchaseOrderDto) {
    let purchaseOrderCreate = await this.createPurchaseOrderUseCase.get(purchaseOrder);
    let response = new CustomResponse<CreatePurchaseOrderResponse>(
      `Orden de compra con código: ${purchaseOrderCreate.id}, creada.`,
      purchaseOrderCreate,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdatePurchaseOrderResponse, isArray: false, status: 200 })
  async updatePurchaseOrder(@Param('id') id: string, @Body() purchaseOrder: UpdatePurchaseOrderDto) {
    purchaseOrder.id = Number(id);
    let purchaseOrderUpdate = await this.updatePurchaseOrderUseCase.get(purchaseOrder);
    let response = new CustomResponse<UpdatePurchaseOrderResponse>(
      `Orden de compra con código: ${purchaseOrderUpdate.id}, actualizado.`,
      purchaseOrderUpdate,
      null
    )
    return response;
  }
}