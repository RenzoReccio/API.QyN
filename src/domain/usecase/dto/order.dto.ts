import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEmail, IsEnum, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { StatusOrderEnum } from "src/data/typeorm/enum/order.enum";

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
  @IsString({ message: 'No tiene el formato correcto.' })
  comments: string;

  //Client Properties
  @ApiProperty()
  @IsString({ message: 'No tiene el formato correcto.' })
  @MaxLength(11, { message: 'El RUC debe tener 11 digitos' })
  @MinLength(11, { message: 'El RUC debe tener 11 digitos' })
  rucClient: string;

  @ApiProperty()
  nameClient: string;

  @ApiProperty()
  @IsPhoneNumber(null, { message: 'El telefono no tiene el formato correcto' })
  phoneClient: string;

  @ApiProperty()
  @IsEmail({}, {
    message: 'El email no tiene el formato correcto'
  })
  emailClient: string;

  @ApiProperty({ type: CreateDetailOrderDto })
  @IsArray({ message: 'No tiene el formato correcto.' })
  orderDetail: CreateDetailOrderDto[]
}

export class UpdateOrderDto {
  @ApiProperty()
  @IsString({ message: 'No tiene el formato correcto.' })
  comments: string;

  @ApiProperty({enum: StatusOrderEnum})
  @IsEnum(StatusOrderEnum, { message: 'No se seleccionó un estado admitido.' })
  status: StatusOrderEnum;
}
