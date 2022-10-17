import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateDetailOrderDto {
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

export class CreateOrderDto {
  @ApiProperty()
  @IsString({ message: 'Los comentarios no tienen el formato correcto.' })
  comments: string;


  // @ApiProperty({ type: CreateDetailOrderDto })
  // @IsArray({ message: 'El detalle de orden no tiene el formato correcto.' })
  // orderDetail: CreateDetailOrderDto[]

  // @ApiProperty()
  // @IsString({ message: 'La direccion no tiene el formato correcto.' })
  // address: string
}