import { Inject } from "@nestjs/common";
import { ClientRepository } from "src/domain/repository/client.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListClientsResponse } from "./listClients.response";

export class ListClientsUseCase implements BaseUseCase<null, ListClientsResponse[]>{
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository
  ) { }

  async get(dto?: null): Promise<ListClientsResponse[]> {
    let clients = await this._clientRepository.findAll(['typeDocument'])
    return clients.map(item => new ListClientsResponse(item));
  }
}