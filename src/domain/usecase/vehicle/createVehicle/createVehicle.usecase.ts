import { Inject } from "@nestjs/common";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateVehicleDto } from "./createVehicle.dto";
import { CreateVehicleResponse } from "./createVehicle.response";
import { TypeVehicleRepository } from "../../../repository/typeVehicle.repository"
import { DriverRepository } from "../../../repository/driver.repository"
import { VehicleRepository } from "../../../repository/vehicle.repository"

import { VehicleModel } from "src/domain/model/vehicle.model";

export class CreateVehicleUseCase implements BaseUseCase<CreateVehicleDto, CreateVehicleResponse>{

  constructor(
    @Inject('TypeVehicleRepository') private _typeVehicleRepository: TypeVehicleRepository,
    @Inject('DriverRepository') private _driverRepository: DriverRepository,
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }

  async get(dto?: CreateVehicleDto): Promise<CreateVehicleResponse> {
    let typeVehicle = await this._typeVehicleRepository.findOne(dto.typeVehicleId);
    let driver = await this._driverRepository.findOne(dto.driverId);

    let vehicleInsert = new VehicleModel(undefined, typeVehicle, driver, dto.plate, dto.brand, dto.color, true)
    vehicleInsert = await this._vehicleRepository.insert(vehicleInsert);
    return new CreateVehicleResponse(vehicleInsert.id);
  }

}