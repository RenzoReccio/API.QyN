import { Injectable } from "@nestjs/common";
import { ClientService } from "src/data/typeorm/service/client.service";
import { ClientRepository } from "src/domain/repository/client.repository";
import { ResourceAlreadyRegistered } from "../error/resourceAlreadyRegistered.error";
import { ClientModel } from "../model/client.model";
import { CreateClientDto } from "./dto/client.dto";

@Injectable()
export class ClientUseCase {
  private _clientRepository: ClientRepository;

  constructor(
    clientService: ClientService
  ) {
    this._clientRepository = clientService
  }

  async getClients(): Promise<ClientModel[]> {
    return await this._clientRepository.findAll();
  }

  async getOneClient(id: number): Promise<ClientModel> {
    return await this._clientRepository.findOne(id);
  }

  async insertClient(client: CreateClientDto): Promise<ClientModel> {
    let clientToInsert = new ClientModel(
      null, client.ruc.trim(), client.name.trim(), client.area.trim(), client.phone.trim(),
      client.email.trim(), [], []
    )

    let clientWithRUC = await this._clientRepository.findByRuc(clientToInsert.ruc);
    if(clientWithRUC) throw new ResourceAlreadyRegistered('Ya hay un cliente con el RUC indicado.');

    return await this._clientRepository.insert(clientToInsert);
  }
} 