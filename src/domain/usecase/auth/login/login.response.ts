import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";
import { User } from "src/domain/model/interface/users.interface";
import { ClientInformation, DataStoredInToken } from "src/utils/auth/models/auth.interface";

export class ClientInformationLoginResponse implements ClientInformation {
  @ApiProperty()
  typeDocument: string;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;
  constructor(client: Client) {
    this.typeDocument = client.typeDocument.name;
    this.numberDocument = client.numberDocument;
    this.address = client.address;
    this.email = client.email;
  }
}

export class LoginResponse implements DataStoredInToken {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: [ClientInformationLoginResponse] })
  client: ClientInformationLoginResponse;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.person.firstName + ' ' + user.person.firstName;
    this.username = user.email;
    this.client = user.client ? new ClientInformationLoginResponse(user.client) : null;
  }
}