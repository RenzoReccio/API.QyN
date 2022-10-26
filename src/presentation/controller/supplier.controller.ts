import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListSuppliersResponse } from 'src/domain/usecase/supplier/listSuppliers/listSuppliers.response';
import { ListSuppliersUseCase } from 'src/domain/usecase/supplier/listSuppliers/listSuppliers.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(
    private listSuppliersUseCase: ListSuppliersUseCase
  ){}

  @Get('')
  @ApiResponse({ type: ListSuppliersResponse, isArray: true, status: 200 })
  async getDrivers() {
    let suppliers = await this.listSuppliersUseCase.get();
    let response = new CustomResponse<ListSuppliersResponse[]>(
      `Proveedores encontrados: ${suppliers.length}.`,
      suppliers,
      null
    )
    return response;
  }

}
