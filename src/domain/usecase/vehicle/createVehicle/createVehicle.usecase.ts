import { Inject } from "@nestjs/common";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateVehicleDto } from "./createVehicle.dto";
import { CreateVehicleResponse } from "./createVehicle.response";
import { TypeVehicleRepository } from "../../../repository/typeVehicle.repository"
import { DriverRepository } from "../../../repository/driver.repository"
import { VehicleRepository } from "../../../repository/vehicle.repository"
import { VehicleModel } from "src/domain/model/vehicle.model";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ResourceAlreadyRegistered } from "src/domain/error/resourceAlreadyRegistered.error";

export class CreateVehicleUseCase implements BaseUseCase<CreateVehicleDto, CreateVehicleResponse>{

  constructor(
    @Inject('TypeVehicleRepository') private _typeVehicleRepository: TypeVehicleRepository,
    @Inject('DriverRepository') private _driverRepository: DriverRepository,
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }

  async get(dto?: CreateVehicleDto): Promise<CreateVehicleResponse> {

    let typeVehicle = await this._typeVehicleRepository.findOne(dto.typeVehicleId);
    if (!typeVehicle) throw new ResourceNotFound('El tipo vehiculo no se encuentra registrado');

    let driver = await this._driverRepository.findOne(dto.driverId);
    if (!driver) throw new ResourceNotFound('El conductor no se encuentra registrado');

    let existingVehicle = await this._vehicleRepository.findByPlate(dto.plate.trim().toLocaleUpperCase(), 0);
    if (existingVehicle) throw new ResourceAlreadyRegistered('La placa indicada ya existe.')

    let vehicleInsert = new VehicleModel(undefined, typeVehicle, driver, dto.plate.trim().toLocaleUpperCase(), dto.brand.trim(), dto.color.trim(), true)
    vehicleInsert = await this._vehicleRepository.insert(vehicleInsert);
    return new CreateVehicleResponse(vehicleInsert.id);
  }

}