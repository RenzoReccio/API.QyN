import { Inject } from "@nestjs/common";
import { UserRolRepository } from "src/domain/repository/userRol.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListUserRolsResponse } from "./listUserRols.response";

export class ListUserRolsUseCase implements BaseUseCase<number, ListUserRolsResponse[]>{
  constructor(
    @Inject('UserRolRepository') private _userRolRepository: UserRolRepository,

  ) { }

  async get(userId: number): Promise<ListUserRolsResponse[]> {
    let userRols = await this._userRolRepository.findByUserId(userId, ['rol']);
    return userRols.map(item => { return new ListUserRolsResponse(item) });
  }

}