import { TypeDocument } from "../model/interface/typeDocument.interface";

export interface TypeDocumentRepository{
  findAll(): Promise<TypeDocument[]>;
  findOne(id: number): Promise<TypeDocument>;
}