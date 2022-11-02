import { Inject } from "@nestjs/common";
import { ResourceAlreadyRegistered } from "src/domain/error/resourceAlreadyRegistered.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
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

    let vehicle = await this._vehicleRepository.findOne(dto.id);
    if (!vehicle) throw new ResourceNotFound('El vehiculo indicado no existe');
    
    let typeVehicle = await this._typeVehicleRepository.findOne(dto.typeVehicleId);
    if (!typeVehicle) throw new ResourceNotFound('El tipo vehiculo no se encuentra registrado.');

    let driver = await this._driverRepository.findOne(dto.driverId);
    if (!driver) throw new ResourceNotFound('El conductor no se encuentra registrado.');

    let existingVehicle = await this._vehicleRepository.findByPlate(dto.plate.trim().toLocaleUpperCase(), dto.id);
    if(existingVehicle) throw new ResourceAlreadyRegistered('La placa indicada ya existe.')

    let vehicleUpdate = new VehicleModel(dto.id, typeVehicle, driver, dto.plate.trim().toLocaleUpperCase(), dto.brand.trim(), dto.color.trim(), dto.status)
    vehicleUpdate = await this._vehicleRepository.update(vehicleUpdate);
    return new UpdateVehicleResponse(vehicleUpdate.id);
  }
}