import { Inject } from "@nestjs/common";
import { ClientRepository } from "src/domain/repository/client.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListClientByIdResponse } from "./listClientById.response";

export class ListClientByIdUseCase implements BaseUseCase<number, ListClientByIdResponse>{
  
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
    @Inject('UserRepository') private _userRepository: UserRepository

  ) { }
  
  async get(dto?: number): Promise<ListClientByIdResponse> {
    let client = await this._clientRepository.findOne(dto, ['typeDocument']);
    let user = await this._userRepository.findByclientId(client.id);

    return new ListClientByIdResponse(client, user);
  }

}