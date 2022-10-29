import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}