import { ApiProperty } from "@nestjs/swagger";
import { Rol } from "src/domain/model/interface/rol.interface";

export class ListRolsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(rol: Rol) {
    this.id = rol.id;
    this.name = rol.name;
  }
}