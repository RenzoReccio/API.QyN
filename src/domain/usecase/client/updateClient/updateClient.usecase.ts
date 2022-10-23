import { Inject } from "@nestjs/common";
import { ClientModel } from "src/domain/model/client.model";
import { ClientRepository } from "src/domain/repository/client.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateClientDto } from "./updateClient.dto";
import { UpdateClientResponse } from "./updateClient.response";

export class UpdateClientUseCase implements BaseUseCase<UpdateClientDto, UpdateClientResponse>{
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository
  ){}
  
  get(dto?: UpdateClientDto): Promise<UpdateClientResponse> {

    // let client = new ClientModel(dto.id)
    return null;
  }

}