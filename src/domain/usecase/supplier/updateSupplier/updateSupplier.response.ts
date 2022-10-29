import { ApiProperty } from "@nestjs/swagger";

export class UpdateSupplierResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}