import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({message: 'El correo no tiene el formato correcto'})
  email: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña no tiene el formato correcto'
  })
  password: string;

  @ApiProperty()
  @IsString({ message: 'El primer nombre no tiene el formato correcto.' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'El primer apellido no tiene el formato correcto.' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'El segundo apellido no tiene el formato correcto.' })
  surName: string;
  
  @ApiProperty()
  @IsDateString({ message: 'La fecha de nacimiento no tiene el formato correcto.' })
  bornDate: Date;
}