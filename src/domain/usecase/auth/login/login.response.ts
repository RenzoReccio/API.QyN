import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";
import { Menu } from "src/domain/model/interface/menu.interface";
import { User } from "src/domain/model/interface/users.interface";
import { ClientInformation, DataStoredInToken, MenuInformation } from "src/utils/auth/models/auth.interface";

export class MenuInformationLoginResponse implements MenuInformation {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  childs: MenuInformation[];

  constructor(menu: Menu) {
    this.id = menu.id;
    this.url = menu.url;
    this.icon = menu.icon;
    this.title = menu.title;
    this.childs = menu.childs?.map(item => {return new MenuInformationLoginResponse(item)});;
  }
}
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

  @ApiProperty({ type: [MenuInformationLoginResponse] })
  menus: MenuInformationLoginResponse[];

  constructor(user: User, menus: Menu[]) {
    this.id = user.id;
    this.name = (user.person.firstName ?? '') + ' ' + (user.person.lastName ?? '') + ' ' + (user.person.surName ?? '');
    this.name.trim();
    this.username = user.email;
    this.client = user.client ? new ClientInformationLoginResponse(user.client) : null;
    this.menus = menus.map(item => {return new MenuInformationLoginResponse(item)});
  }
}