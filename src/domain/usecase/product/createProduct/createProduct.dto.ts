import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString({
    message: 'El codigo no tiene el formato correcto'
  })
  code: string;

  @ApiProperty()
  @IsString({
    message: 'El nombre no tiene el formato correcto'
  })
  name: string;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  }, {
    message: 'El precio de venta no tiene el formato correcto'
  })
  salesPrice: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  }, {
    message: 'El precio de compra no tiene el formato correcto'
  })
  purchasePrice: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El id categoria no tiene el formato correcto'
  })
  categoryId: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El stock minimo no tiene el formato correcto'
  })
  minStock: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El stock maximo no tiene el formato correcto'
  })
  maxStock: number;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0
  }, {
    message: 'El stock no tiene el formato correcto'
  })
  stock: number;

  @ApiProperty()
  @IsBoolean({ message: "Mostrar en catalogo no tiene el formato correcto" })
  showInCatalog: boolean;

  @ApiProperty()
  @IsUrl({ message: "El Url de imagen no tiene el formato correcto" })
  urlImage: string;
}