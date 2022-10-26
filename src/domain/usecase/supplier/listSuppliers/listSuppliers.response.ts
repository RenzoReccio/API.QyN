import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "src/domain/model/interface/supplier.interface";

export class ListSuppliersResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ruc: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  email: string;

  constructor(supplier: Supplier) {
    this.id = supplier.id
    this.ruc = supplier.ruc
    this.name = supplier.name
    this.area = supplier.area
    this.email = supplier.email
  }
}