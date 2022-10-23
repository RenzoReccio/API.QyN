import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";

export class ListClientsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  phone: string;

  constructor(client: Client){
    this.id = client.id;
    this.name = client.name;
    this.numberDocument = `${client.typeDocument.name} - ${client.numberDocument}`;
    this.phone = client.phone;
  }
}