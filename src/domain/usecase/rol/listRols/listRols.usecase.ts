import { Inject } from "@nestjs/common";
import { RolRepository } from "src/domain/repository/rol.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListRolsResponse } from "./listRols.response";

export class ListRolsUseCase implements BaseUseCase<null, ListRolsResponse[]>{
  constructor(
    @Inject('RolRepository') private _rolRepository: RolRepository,
  ){}

  async get(dto?: null): Promise<ListRolsResponse[]> {
    let rols = await this._rolRepository.findAll()
    return rols.map(item => { return new ListRolsResponse(item) });
  }
}