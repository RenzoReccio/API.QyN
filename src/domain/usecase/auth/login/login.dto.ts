import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsString({
    message: 'El nombre de usuario no tiene el formato correcto'
  })
  userName: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña tiene el formato correcto'
  })
  password: string;
}