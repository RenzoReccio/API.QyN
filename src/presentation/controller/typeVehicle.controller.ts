import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListTypeVehiclesResponse } from 'src/domain/usecase/typeVehicle/listTypeVehicles/listTypeVehicles.response';
import { ListTypeVehiclesUseCase } from 'src/domain/usecase/typeVehicle/listTypeVehicles/listTypeVehicles.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('typevehicle')
@ApiTags('typevehicle')
export class TypeVehicleController {
  constructor(
    private listTypeVehiclesUseCase: ListTypeVehiclesUseCase
  ){}

  @Get('')
  @ApiResponse({ type: ListTypeVehiclesResponse, isArray: true, status: 200 })
  async getTypeVehicles() {
    let typevehicles = await this.listTypeVehiclesUseCase.get();
    let response = new CustomResponse<ListTypeVehiclesResponse[]>(
      `Tipos Vehiculos encontrados: ${typevehicles.length}.`,
      typevehicles,
      null
    )
    return response;
  }

}
