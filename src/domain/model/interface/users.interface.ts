import { Client } from "./client.interface";
import { Person } from "./person.interface";
import { UserRol } from "./userRol.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  client: Client;
  person: Person;
  userRols: UserRol[];
  //Change password fields
  passwordChangeToken: string;
  passwordChangeRequestedDate: Date;
}
