import { Inject } from "@nestjs/common";
import { TypeDocumentRepository } from "src/domain/repository/typeDocument.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListTypeDocumentResponse } from "./listTypeDocuments.response";

export class ListTypeDocumentUseCase implements BaseUseCase<null, ListTypeDocumentResponse[]>{
  
  constructor(
    @Inject('TypeDocumentRepository') private _typeDocumentRepository: TypeDocumentRepository
  ) { }


  async get(dto?: null): Promise<ListTypeDocumentResponse[]> {

    let typeDocuments = await this._typeDocumentRepository.findAll();
    return typeDocuments.map(item => new ListTypeDocumentResponse(item))
  }

}