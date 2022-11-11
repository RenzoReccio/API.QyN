import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({message: 'El correo no tiene el formato correcto'})
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  surName: string;
  
  @ApiProperty()
  bornDate: Date;
}