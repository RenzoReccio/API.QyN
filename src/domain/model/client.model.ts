import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";
import { Order } from "src/domain/model/interface/order.interface";
import { User } from "src/domain/model/interface/users.interface";

export class ClientModel implements Client {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ruc: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  orders: Order[];

  @ApiProperty()
  users: User[];

  constructor(
    id: number, ruc: string, name: string, area: string,
    phone: string, email: string, orders: Order[], users: User[]
  ) {
    this.id = id;
    this.ruc = ruc;
    this.name = name;
    this.area = area;
    this.phone = phone;
    this.email = email;
    this.orders = orders;
    this.users = users;
  }
}