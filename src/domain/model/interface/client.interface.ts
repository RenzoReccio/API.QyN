import { Order } from "./order.interface";
import { User } from "./users.interface";

export interface Client {
  id: number;
  ruc: string;
  name: string;
  area: string;
  phone: string;
  email: string;
  orders: Order[];
  users: User[];
}
