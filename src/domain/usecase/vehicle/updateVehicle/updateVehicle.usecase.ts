import { Inject } from "@nestjs/common";
import { VehicleModel } from "src/domain/model/vehicle.model";
import { DriverRepository } from "src/domain/repository/driver.repository";
import { TypeVehicleRepository } from "src/domain/repository/typeVehicle.repository";
import { VehicleRepository } from "src/domain/repository/vehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateVehicleDto } from "./updateVehicle.dto";
import { UpdateVehicleResponse } from "./updateVehicle.response";

export class UpdateVehicleUseCase implements BaseUseCase<UpdateVehicleDto, UpdateVehicleResponse>{

  constructor(
    @Inject('TypeVehicleRepository') private _typeVehicleRepository: TypeVehicleRepository,
    @Inject('DriverRepository') private _driverRepository: DriverRepository,
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }

  async get(dto?: UpdateVehicleDto): Promise<UpdateVehicleResponse> {
    let typeVehicle = await this._typeVehicleRepository.findOne(dto.typeVehicleId);
    let driver = await this._driverRepository.findOne(dto.driverId);

    let vehicleUpdate = new VehicleModel(dto.id, typeVehicle, driver, dto.plate, dto.brand, dto.color, dto.status)
    vehicleUpdate = await this._vehicleRepository.update(vehicleUpdate);
    return new UpdateVehicleResponse(vehicleUpdate.id);
  }
}