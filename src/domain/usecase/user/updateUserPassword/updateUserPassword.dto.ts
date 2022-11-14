import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserPasswordDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  @IsString({
    message: 'La contraseña no tiene el formato correcto'
  })
  password: string;
}