import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRolsResponse {
  @ApiProperty()
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}