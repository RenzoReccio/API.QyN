import { Inject } from "@nestjs/common";
import { DriverRepository } from "src/domain/repository/driver.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListDriversResponse } from "./listDrivers.response";

export class ListDriversUseCase implements BaseUseCase<null, ListDriversResponse[]>{
  constructor(
    @Inject('DriverRepository') private _driverRepository: DriverRepository,

  ){}
  async get(dto?: null): Promise<ListDriversResponse[]> {
    let drivers = await this._driverRepository.findAll(['typeDocument', 'person'])
    return drivers.map(item => { return new ListDriversResponse(item) });
  }

}