import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNumber, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty()
  @IsEmail({message: 'El correo no tiene el formato correcto'})
  email: string;

  @ApiProperty()
  @IsString({
    message: 'La contraseña tiene el formato correcto'
  })
  password: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id tipo documento no tiene el formato correcto.'
  })
  typeDocumentId: number;
  
  @ApiProperty()
  @IsNumberString({ message: 'El numero documento no tiene el formato correcto.' })
  numberDocument: string;
  
  @ApiProperty()
  @IsString({ message: 'El nombre de la empresa no tiene el formato correcto.' })
  companyName: string;
  
  @ApiProperty()
  @IsPhoneNumber('PE', { message: 'El numero no tiene el formato correcto.' })
  phone: string;

  @ApiProperty()
  @IsString({ message: 'La direccion no tiene el formato correcto.' })
  address: string;

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