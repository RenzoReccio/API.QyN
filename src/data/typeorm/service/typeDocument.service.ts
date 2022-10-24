import { TypeDocument } from "src/domain/model/interface/typeDocument.interface";
import { TypeDocumentRepository } from "src/domain/repository/typeDocument.repository";
import { TypeDocumentEntity } from "../entity/typeDocument.entity";

export class TypeDocumentService implements TypeDocumentRepository {
  async findAll(): Promise<TypeDocument[]> {
    return await TypeDocumentEntity.find<TypeDocumentEntity>();
  }
  async findOne(id: number): Promise<TypeDocument> {
    return await TypeDocumentEntity.findOne<TypeDocumentEntity>({ where: { id: id } });
  }

}