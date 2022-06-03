import { ApiProperty } from "@nestjs/swagger";
import { ClientModel } from "./client.model";
import { User } from "./interface/users.interface";

export class UserModel implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  clients: ClientModel[];

  constructor(
    id: number, email: string, password: string, firstName: string,
    lastName: string, surName: string, isActive: boolean, clients: ClientModel[]
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.surName = surName;
    this.isActive = isActive;
    this.clients = clients;
  }
}