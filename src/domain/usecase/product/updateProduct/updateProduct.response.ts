import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }

}