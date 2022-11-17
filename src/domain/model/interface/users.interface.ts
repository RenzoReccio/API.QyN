import { Client } from "./client.interface";
import { Person } from "./person.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  client: Client;
  person: Person;
  //Change password fields
  passwordChangeToken: string;
  passwordChangeRequestedDate: Date;
}
