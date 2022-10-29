import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSupplierDto } from 'src/domain/usecase/supplier/createSupplier/createSupplier.dto';
import { CreateSupplierResponse } from 'src/domain/usecase/supplier/createSupplier/createSupplier.response';
import { CreateSupplierUseCase } from 'src/domain/usecase/supplier/createSupplier/createSupplier.usecase';
import { ListSupplierByIdResponse } from 'src/domain/usecase/supplier/listSupplierById/listSupplierById.response';
import { ListSupplierByIdUseCase } from 'src/domain/usecase/supplier/listSupplierById/listSupplierById.usecase';
import { ListSuppliersResponse } from 'src/domain/usecase/supplier/listSuppliers/listSuppliers.response';
import { ListSuppliersUseCase } from 'src/domain/usecase/supplier/listSuppliers/listSuppliers.usecase';
import { UpdateSupplierDto } from 'src/domain/usecase/supplier/updateSupplier/updateSupplier.dto';
import { UpdateSupplierUseCase } from 'src/domain/usecase/supplier/updateSupplier/updateSupplier.usecase';
import { UpdateVehicleResponse } from 'src/domain/usecase/vehicle/updateVehicle/updateVehicle.response';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(
    private listSuppliersUseCase: ListSuppliersUseCase,
    private listSupplierByIdUseCase: ListSupplierByIdUseCase,
    private createSupplierUseCase: CreateSupplierUseCase,
    private updateSupplierUseCase: UpdateSupplierUseCase,
  ){}

  @Get('')
  @ApiResponse({ type: ListSuppliersResponse, isArray: true, status: 200 })
  async getSuppliers() {
    let suppliers = await this.listSuppliersUseCase.get();
    let response = new CustomResponse<ListSuppliersResponse[]>(
      `Proveedores encontrados: ${suppliers.length}.`,
      suppliers,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ListSupplierByIdResponse, isArray: false, status: 200 })
  async getOneSupplier(@Param('id') id: number) {
    let vehicle = await this.listSupplierByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListSupplierByIdResponse>(
      `Proveedor con id: ${id} encontrado.`,
      vehicle,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreateSupplierResponse, isArray: false, status: 200 })
  async createSupplier(@Body() supplier: CreateSupplierDto) {
    let supplierInsert = await this.createSupplierUseCase.get(supplier);
    let response = new CustomResponse<CreateSupplierResponse>(
      `Proveedor con código: ${supplierInsert.id}, creado.`,
      supplierInsert,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdateVehicleResponse, isArray: false, status: 200 })
  async updateSupplier(@Param('id') id: number, @Body() supplier: UpdateSupplierDto) {
    supplier.id = Number(id);
    let supplierUpdate = await this.updateSupplierUseCase.get(supplier);
    let response = new CustomResponse<UpdateVehicleResponse>(
      `Proveedor con código: ${supplierUpdate.id}, actualizado.`,
      supplierUpdate,
      null
    )
    return response;
  }
}
