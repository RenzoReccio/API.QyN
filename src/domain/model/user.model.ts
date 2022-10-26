import { Client } from "./interface/client.interface";
import { Person } from "./interface/person.interface";
import { User } from "./interface/users.interface";

export class UserModel implements User {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  client: Client;
  person: Person;

  constructor(
    id: number,
    email: string,
    password: string,
    isActive: boolean,
    client: Client,
    person: Person,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.client = client;
    this.person = person;
  }
}