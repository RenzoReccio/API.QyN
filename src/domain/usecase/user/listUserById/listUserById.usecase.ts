import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListUserByIdResponse } from "./listUserById.response";

export class ListUserByIdUseCase implements BaseUseCase<number, ListUserByIdResponse>{
  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,

  ){}

  async get(id: number): Promise<ListUserByIdResponse> {
    let user = await this._userRepository.findById(id, ['person']);
    return new ListUserByIdResponse(user);
  }
  
}