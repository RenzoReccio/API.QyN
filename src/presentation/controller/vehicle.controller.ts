import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListVehiclesResponse } from 'src/domain/usecase/vehicle/listVehicles/listVehicles.response';
import { ListVehiclesUseCase } from 'src/domain/usecase/vehicle/listVehicles/listVehicles.usecase';
import { CustomResponse } from 'src/utils/response/response.model';


@Controller('vehicle')
@ApiTags('vehicle')
export class VehicleController {
  constructor(
    private readonly listVehicleUseCase: ListVehiclesUseCase
  ) {
  }

  @Get('')
  @ApiResponse({type: ListVehiclesResponse, isArray: true, status: 200})
  async getVehiculo(){
    let vehicles = await this.listVehicleUseCase.get();
    let response = new CustomResponse<ListVehiclesResponse[]>(
      `Vehiculos encontrados: ${vehicles.length}.`,
      vehicles,
      null
    )
    return response;
  }
}