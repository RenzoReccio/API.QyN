import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from 'src/domain/usecase/vehicle/createVehicle/createVehicle.dto';
import { CreateVehicleResponse } from 'src/domain/usecase/vehicle/createVehicle/createVehicle.response';
import { CreateVehicleUseCase } from 'src/domain/usecase/vehicle/createVehicle/createVehicle.usecase';
import { ListVehicleByIdResponse } from 'src/domain/usecase/vehicle/listVehicleById/listVehiclebyId.response';
import { ListVehicleByIdUseCase } from 'src/domain/usecase/vehicle/listVehicleById/listVehicleById.usecase';
import { ListVehiclesResponse } from 'src/domain/usecase/vehicle/listVehicles/listVehicles.response';
import { ListVehiclesUseCase } from 'src/domain/usecase/vehicle/listVehicles/listVehicles.usecase';
import { UpdateVehicleDto } from 'src/domain/usecase/vehicle/updateVehicle/updateVehicle.dto';
import { UpdateVehicleResponse } from 'src/domain/usecase/vehicle/updateVehicle/updateVehicle.response';
import { UpdateVehicleUseCase } from 'src/domain/usecase/vehicle/updateVehicle/updateVehicle.usecase';
import { CustomResponse } from 'src/utils/response/response.model';


@Controller('vehicle')
@ApiTags('vehicle')
export class VehicleController {
  constructor(
    private readonly listVehicleUseCase: ListVehiclesUseCase,
    private readonly listVehicleByIdUseCase: ListVehicleByIdUseCase,
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
  ) {
  }

  @Get('')
  @ApiResponse({ type: ListVehiclesResponse, isArray: true, status: 200 })
  async getVehiculo() {
    let vehicles = await this.listVehicleUseCase.get();
    let response = new CustomResponse<ListVehiclesResponse[]>(
      `Vehiculos encontrados: ${vehicles.length}.`,
      vehicles,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ListVehicleByIdResponse, isArray: false, status: 200 })
  async getOneVehiculo(@Param('id') id: number) {
    let vehicle = await this.listVehicleByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListVehicleByIdResponse>(
      `Vehiculo con id: ${id} encontrado.`,
      vehicle,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreateVehicleResponse, isArray: false, status: 200 })
  async createVehicle(@Body() vehicle: CreateVehicleDto) {
    let vehicleInsert = await this.createVehicleUseCase.get(vehicle);
    let response = new CustomResponse<CreateVehicleResponse>(
      `Vehiculo con código: ${vehicleInsert.id}, creado.`,
      vehicleInsert,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdateVehicleResponse, isArray: false, status: 200 })
  async updateVehicle(@Param('id') id: number, @Body() vehicle: UpdateVehicleDto) {
    vehicle.id = Number(id);
    let vehicleUpdate = await this.updateVehicleUseCase.get(vehicle);
    let response = new CustomResponse<UpdateVehicleResponse>(
      `Vehiculo con código: ${vehicleUpdate.id}, actualizado.`,
      vehicleUpdate,
      null
    )
    return response;
  }
}