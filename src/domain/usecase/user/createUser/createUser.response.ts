import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}