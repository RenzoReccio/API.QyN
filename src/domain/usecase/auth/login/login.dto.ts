import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail({message: 'El nombre de usuario no tiene el formato correcto'})
  userName: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña tiene el formato correcto'
  })
  password: string;
}