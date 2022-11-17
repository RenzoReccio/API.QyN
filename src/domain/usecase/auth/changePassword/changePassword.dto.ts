import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty()
  @IsString({
    message: 'La contraseña no tiene el formato correcto'
  })
  @MinLength(5, {
    message: 'La contraseña debe tener 5 caracteres como minimo'
  })
  password: string;

  @ApiProperty()
  token: string;
}