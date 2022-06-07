import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsString, IsUrl } from "class-validator";
import { TypeProductEnum } from "src/data/typeorm/enum/product.enum";

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: 'El codigo no tiene el formato correcto.' })
  code: string;

  @ApiProperty()
  @IsString({ message: 'El nombre no tiene el formato correcto.' })
  name: string;

  @ApiProperty({enum: TypeProductEnum})
  @IsEnum(TypeProductEnum, { message: 'No se seleccionó un tipo de producto admitido.' })
  type: TypeProductEnum;

  @ApiProperty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2
  }, {
    message: 'El precio de venta no tiene el formato correcto.'
  })
  salesPrice: number;

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
    message: 'El stock no tiene el formato correcto.'
  })
  stock: number;

  @ApiProperty()
  @IsBoolean({
    message: 'El campo showInCatalog no tiene el formato correcto.'
  })
  showInCatalog: boolean;

  @ApiProperty()
  @IsUrl({
    message: 'No es un Url Valido.'
  })
  urlImage: string;
}
