import { Inject } from "@nestjs/common";
import { TypeVehicleRepository } from "src/domain/repository/typeVehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListTypeVehiclesResponse } from "./listTypeVehicles.response";

export class ListTypeVehiclesUseCase implements BaseUseCase<null, ListTypeVehiclesResponse[]>{
  constructor(
    @Inject('TypeVehicleRepository') private _typeVehicleRepository: TypeVehicleRepository,
  ){}

  async get(dto?: null): Promise<ListTypeVehiclesResponse[]> {
    let typeVehicles = await this._typeVehicleRepository.findAll()
    return typeVehicles.map(item => { return new ListTypeVehiclesResponse(item) });
  }
}