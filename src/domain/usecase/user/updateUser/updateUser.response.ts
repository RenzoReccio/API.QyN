import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}