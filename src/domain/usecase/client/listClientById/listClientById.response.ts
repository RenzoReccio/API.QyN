import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";
import { User } from "src/domain/model/interface/users.interface";

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

  @ApiProperty()
  isActive: boolean;

  constructor(client: Client, user: User) {
    this.id = client.id;
    this.typeDocumentId = client.typeDocument.id;
    this.numberDocument = client.numberDocument;
    this.name = client.name;
    this.area = client.area;
    this.phone = client.phone;
    this.email = client.email;
    this.address = client.address;
    this.isActive = user.isActive;
  }
}