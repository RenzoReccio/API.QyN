import { Inject } from "@nestjs/common";
import { ClientModel } from "src/domain/model/client.model";
import { ClientRepository } from "src/domain/repository/client.repository";
import { TypeDocumentRepository } from "src/domain/repository/typeDocument.repository";

import { BaseUseCase } from "../../base/base.usecase";
import { UpdateClientDto } from "./updateClient.dto";
import { UpdateClientResponse } from "./updateClient.response";

export class UpdateClientUseCase implements BaseUseCase<UpdateClientDto, UpdateClientResponse>{
  constructor(
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
    @Inject('TypeDocumentRepository') private _typeDocumentRepository: TypeDocumentRepository
  ) { }

  async get(dto?: UpdateClientDto): Promise<UpdateClientResponse> {

    let typeDocument = await this._typeDocumentRepository.findOne(dto.typeDocumentId);
    let client = new ClientModel(
      dto.id, typeDocument, dto.numberDocument,
      dto.name, dto.area, dto.phone,
      dto.email, dto.address
    );

    client = await this._clientRepository.insert(client);

    return new UpdateClientResponse(client.id);
  }

}