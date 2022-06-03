import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {

  @ApiProperty()
  @IsString({ message: 'No tiene el formato correcto.' })
  @MaxLength(11, { message: 'El RUC debe tener 11 digitos' })
  @MinLength(11, { message: 'El RUC debe tener 11 digitos' })
  public ruc: string;

  @ApiProperty()
  @IsString({ message: 'El nombre no tiene el formato correcto.' })
  public name: string;

  @ApiProperty()
  @IsString({ message: 'El area no tiene el formato correcto.' })
  public area: string;

  @ApiProperty()
  @IsPhoneNumber(null, { message: 'El telefono no tiene el formato correcto' })
  public phone: string;

  @ApiProperty()
  @IsEmail({}, {
    message: 'El email no tiene el formato correcto'
  })
  public email: string;
}

export class UpdateClientDto extends CreateClientDto {
  @ApiProperty()
  @IsArray({
    message: 'El campo users no tiene el formato correcto'
  })
  public users: number[];
}