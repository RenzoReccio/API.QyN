import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength, IsEmail } from "class-validator";

export class UpdateSupplierDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString({ message: 'El RUC no tiene el formato correcto.' })
  @MaxLength(11, { message: 'El RUC debe tener 11 digitos' })
  @MinLength(11, { message: 'El RUC debe tener 11 digitos' })
  ruc: string;

  @ApiProperty()
  @IsString({ message: 'El nombre no tiene el formato correcto.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'El area no tiene el formato correcto.' })
  area: string;
    
  @ApiProperty()
  @IsString({ message: 'El email no tiene el formato correcto.' })
  @IsEmail({ message: 'El email no tiene el formato de correo.' })
  email: string;
}