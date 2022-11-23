import { Inject } from "@nestjs/common";
import { ClientRepository } from "src/domain/repository/client.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListClientByIdResponse } from "./listClientById.response";

export class ListClientByIdUseCase implements BaseUseCase<number, ListClientByIdResponse>{
  
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
  ) { }
  
  async get(dto?: number): Promise<ListClientByIdResponse> {
    let client = await this._clientRepository.findOne(dto, ['typeDocument']);

    return new ListClientByIdResponse(client);
  }

}