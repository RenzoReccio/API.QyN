import { Client } from "./client.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  surName: string;
  isActive: boolean;
  clients: Client[];
}
