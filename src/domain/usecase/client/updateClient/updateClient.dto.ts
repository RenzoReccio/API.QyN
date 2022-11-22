import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class UpdateClientDto {
  @ApiProperty()
  id: number;

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
  @IsString({ message: 'El numero documento no tiene el formato correcto.' })
  numberDocument: string;

  @ApiProperty()
  @IsString({ message: 'El nombre no tiene el formato correcto.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'El area no tiene el formato correcto.' })
  area: string;

  @ApiProperty()
  @IsPhoneNumber('PE', { message: 'El numero no tiene el formato correcto.' })
  phone: string;

  @ApiProperty()
  @IsEmail({ message: 'El correo no tiene el formato correcto.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'La direccion no tiene el formato correcto.' })
  address: string;

  @ApiProperty()
  @IsString({ message: 'El "Esta activo" no tiene el formato correcto.' })
  isActive: boolean;
}