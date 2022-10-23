import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";

export class ListClientByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  typeDocumentId: number;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  constructor(client: Client) {
    this.id = client.id;
    this.typeDocumentId = client.typeDocument.id;
    this.numberDocument = client.numberDocument;
    this.area = client.area;
    this.phone = client.phone;
    this.email = client.email;
    this.address = client.address;
  }
}