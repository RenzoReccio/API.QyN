import { ApiProperty } from "@nestjs/swagger";

export class CreateProductResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }

}