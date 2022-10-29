import { Supplier } from "./interface/supplier.interface";

export class SupplierModel implements Supplier {
  id: number;
  ruc: string;
  name: string;
  area: string;
  email: string;

  constructor(id: number,
    ruc: string,
    name: string,
    area: string,
    email: string
  ) {
    this.id = id;
    this.ruc = ruc;
    this.name = name;
    this.area = area;
    this.email = email;

  }
}