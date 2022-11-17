import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RequestPasswordChangeDto {
  @ApiProperty()
  @IsEmail({ message: 'El nombre de usuario no tiene el formato correcto' })
  userName: string;
}