import { Inject } from "@nestjs/common";
import { ClientRepository } from "src/domain/repository/client.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListClientByUserIdResponse } from "./listClientByUserId.response";

export class ListClientByUserIdUseCase implements BaseUseCase<number, ListClientByUserIdResponse>{
  
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository
  ) { }
  
  async get(dto?: number): Promise<ListClientByUserIdResponse> {
    let client = await this._clientRepository.findByUserId(dto);
    return new ListClientByUserIdResponse(client);
  }

}