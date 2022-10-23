import { Client } from "./interface/client.interface";
import { Order } from "./interface/order.interface";
import { TypeDocument } from "./interface/typeDocument.interface";
import { User } from "./interface/users.interface";

export class ClientModel implements Client {
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
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number, typeDocument: TypeDocument, numberDocument: string,
    name: string, area: string, phone: string, email: string,
    address: string
  ) {
    this.id = id;
    this.typeDocument = typeDocument;
    this.numberDocument = numberDocument;
    this.name = name;
    this.area = area;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.orders = undefined
    this.user = undefined
    this.createdAt = undefined
    this.updatedAt = undefined
  }
}