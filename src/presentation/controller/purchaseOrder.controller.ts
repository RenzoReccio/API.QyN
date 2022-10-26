import { Body, Controller, Get, Param } from "@nestjs/common";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePurchaseOrderDto } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.dto";
import { CreatePurchaseOrderResponse } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.response";
import { CreatePurchaseOrderUseCase } from "src/domain/usecase/purchaseOrder/createPurchaseOrder/createPurchaseOrder.usecase";
import { ListPurchaseOrderByIdResponse } from "src/domain/usecase/purchaseOrder/listPurchaseOrderById/listPurchaseOrderById.response";
import { ListPurchaseOrderByIdUseCase } from "src/domain/usecase/purchaseOrder/listPurchaseOrderById/listPurchaseOrderById.usecase";
import { ListPurchaseOrdersResponse } from "src/domain/usecase/purchaseOrder/listPurchaseOrders/listPurchaseOrders.response";
import { ListPurchaseOrdersUseCase } from "src/domain/usecase/purchaseOrder/listPurchaseOrders/listPurchaseOrders.usecase";
import { CustomResponse } from "src/utils/response/response.model";

@Controller('purchaseorder')
@ApiTags('purchaseorder')
export class PurchaseOrderController {
  constructor(
    private listPurchaseOrdersUseCase: ListPurchaseOrdersUseCase,
    private listPurchaseOrderByIdUseCase: ListPurchaseOrderByIdUseCase,
    private createPurchaseOrderUseCase: CreatePurchaseOrderUseCase,
  ) { }

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
  async createPurchaseOrder(@Body() purchaseOrder: CreatePurchaseOrderDto){
    let purchaseOrderCreate = await this.createPurchaseOrderUseCase.get(purchaseOrder);
    let response = new CustomResponse<CreatePurchaseOrderResponse>(
      `Orden de compra con código: ${purchaseOrderCreate.id}, creada.`,
      purchaseOrderCreate,
      null
    )
    return response;
  }

}