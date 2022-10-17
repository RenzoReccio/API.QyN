import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class UpdateOrderDto {
  
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id no tiene el formato correcto'
  })
  id: number;

  @ApiProperty()
  @IsString({
    message: 'El comentario no tiene el formato correcto'
  })
  comments: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El estado no tiene el formato correcto'
  })
  statusId: number;

  @ApiProperty()
  @IsDateString({}, {message: 'La fecha estimada no es valida'})
  estimatedDate: Date;

  @ApiProperty()
  @IsString({
    message: 'La dirección no tiene el formato correcto'
  })
  address: string;
}