import { ApiProperty } from "@nestjs/swagger";
import { UserRol } from "src/domain/model/interface/userRol.interface";

export class ListUserRolsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(userRol: UserRol) {
    this.id = userRol.rol.id;
    this.name = userRol.rol.name;
  }
}