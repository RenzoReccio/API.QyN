import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientResponse {
  @ApiProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}