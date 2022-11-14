import { Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
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

    let clienExist = await this._clientRepository.findOne(dto.id);
    if (!clienExist) throw new ValidationError('El cliente indicado no existe')

    let typeDocument = await this._typeDocumentRepository.findOne(dto.typeDocumentId);
    if (!typeDocument) throw new ResourceNotFound('El tipo documento indicado no se encuentra registrado');

    if(this.isValidNumberDocument(typeDocument.id, dto.numberDocument.trim())) throw new ValidationError('El numero de documento dado no es valido');

    let client = new ClientModel(
      dto.id, typeDocument, dto.numberDocument,
      dto.name, dto.area, dto.phone,
      dto.email, dto.address
    );

    client = await this._clientRepository.insert(client);

    return new UpdateClientResponse(client.id);
  }

  private isValidNumberDocument(idTypeDocument: number, numberDocument: string) {

    //Validation DNI
    if(idTypeDocument == 1 && numberDocument.length == 8) return false;

    //Validation RUC 
    if(idTypeDocument == 2 && numberDocument.length == 11) return false;

    return true;
  }
}