import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class UpdatePurchaseOrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsDateString({ message: 'La fecha de llegada no tiene el formato correcto.' })
  arrivalDate: Date;

  @ApiProperty()
  @IsString({ message: 'El comentario no tiene el formato correcto.' })
  comments: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id estado no tiene el formato correcto.'
  })
  purchaseOrderStatusId: number;
}