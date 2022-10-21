import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListDriversResponse } from 'src/domain/usecase/driver/listDrivers/listDrivers.response';
import { ListDriversUseCase } from 'src/domain/usecase/driver/listDrivers/listDrivers.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('driver')
@ApiTags('driver')
export class DriverController {
  constructor(
    private listDriversUseCase: ListDriversUseCase
  ){}

  @Get('')
  @ApiResponse({ type: ListDriversResponse, isArray: true, status: 200 })
  async getDrivers() {
    let vehicles = await this.listDriversUseCase.get();
    let response = new CustomResponse<ListDriversResponse[]>(
      `Conductores encontrados: ${vehicles.length}.`,
      vehicles,
      null
    )
    return response;
  }

}
