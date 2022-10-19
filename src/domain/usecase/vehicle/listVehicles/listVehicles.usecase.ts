import { Inject } from "@nestjs/common";
import { VehicleRepository } from "src/domain/repository/vehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListVehiclesResponse } from "./listVehicles.response";

export class ListVehiclesUseCase implements BaseUseCase<null, ListVehiclesResponse[]>{
  constructor(
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }


  async get(dto?: null): Promise<ListVehiclesResponse[]> {
    let vehicles = await this._vehicleRepository.findAll(['typeVehicle']);
    return vehicles.map(item => { return new ListVehiclesResponse(item) });
  }


}