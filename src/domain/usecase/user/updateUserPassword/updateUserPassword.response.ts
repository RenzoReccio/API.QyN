import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}