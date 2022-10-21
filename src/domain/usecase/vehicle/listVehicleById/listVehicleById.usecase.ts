import { Inject } from "@nestjs/common";
import { VehicleRepository } from "src/domain/repository/vehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListVehicleByIdResponse } from "./listVehiclebyId.response";

export class ListVehicleByIdUseCase implements BaseUseCase<number, ListVehicleByIdResponse>{

  constructor(
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }


  async get(id: number): Promise<ListVehicleByIdResponse> {
    let vehicle = await this._vehicleRepository.findOne(id, ['typeVehicle', 'driver']);
    return new ListVehicleByIdResponse(vehicle);
  }

}