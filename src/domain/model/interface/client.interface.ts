import { Auditory } from "./base/auditory.interface";
import { Order } from "./order.interface";
import { TypeDocument } from "./typeDocument.interface";
import { User } from "./users.interface";

export interface Client extends Auditory {
  id: number;
  typeDocument: TypeDocument;
  numberDocument: string;
  name: string;
  area: string;
  phone: string;
  email: string;
  address: string;
  orders: Order[];
  user: User;
}
