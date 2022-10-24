import { ApiProperty } from "@nestjs/swagger";
import { TypeDocument } from "src/domain/model/interface/typeDocument.interface";

export class ListTypeDocumentResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(typeDocument: TypeDocument) {
    this.id = typeDocument.id;
    this.name = typeDocument.name;

  }
}