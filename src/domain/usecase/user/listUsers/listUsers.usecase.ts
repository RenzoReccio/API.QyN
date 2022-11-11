import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListUsersResponse } from "./listUsers.response";

export class ListUsersUseCase implements BaseUseCase<null, ListUsersResponse[]>{
  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,

  ){}

  async get(dto?: null): Promise<ListUsersResponse[]> {
    let users = await this._userRepository.findAll(['person']);
  
    return users.map(item => {return new ListUsersResponse(item)});
  }
  
}