import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class DetailCreatePurchaseOrderDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id producto no tiene el formato correcto.'
  })
  productId: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  }, {
    message: 'El precio de compra no tiene el formato correcto.'
  })
  purchasePrice: number;

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
export class CreatePurchaseOrderDto {
  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id proveedor no tiene el formato correcto.'
  })
  supplierId: number;

  @ApiProperty()
  @IsDateString({ message: 'La fecha de llegada no tiene el formato correcto.' })
  arrivalDate: Date;

  @ApiProperty()
  @IsString({ message: 'El comentario no tiene el formato correcto.' })
  comments: string;

  @ApiProperty({ type: DetailCreatePurchaseOrderDto, isArray: true })
  @IsArray({
    message: 'El campo detalle no tiene el formato correcto'
  })
  purchaseOrderDetails: DetailCreatePurchaseOrderDto[];
}