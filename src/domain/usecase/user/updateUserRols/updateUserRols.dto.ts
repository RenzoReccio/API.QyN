import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UpdateUserRolsDto {
  @ApiProperty({type: Number, isArray: true})
  @IsArray({message: 'Los roles no tienen el formato correcto'})
  rolIds: number[]

  @ApiProperty()
  userId: number
}