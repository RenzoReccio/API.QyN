import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class DetailCreateClientOrderDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'La cantidad no tiene el formato correcto.'
  })
  idProduct: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'La cantidad no tiene el formato correcto.'
  })
  quantity: number;
}

export class CreateClientOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsString({ message: 'La direccion no tiene el formato correcto.' })
  address: string;

  @ApiProperty()
  @IsString({ message: 'Los comentarios no tienen el formato correcto.' })
  comments: string;

  @ApiProperty({ type: DetailCreateClientOrderDto, isArray: true })
  @IsArray({ message: 'El detalle de orden no tiene el formato correcto.' })
  orderDetail: DetailCreateClientOrderDto[]
}