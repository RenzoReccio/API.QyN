import { ApiProperty } from "@nestjs/swagger";
import { TypeProductEnum } from "src/data/typeorm/enum/product.enum";
import { Product } from "./interface/product.interface";

export class ProductModel implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: TypeProductEnum })
  type: TypeProductEnum;

  @ApiProperty()
  salesPrice: number;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  showInCatalog: boolean;

  @ApiProperty()
  urlImage: string;

  constructor(
    id: number, code: string, name: string, type: TypeProductEnum,
    salesPrice: number, purchasePrice: number, stock: number,
    showInCatalog: boolean, urlImage: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.type = type;
    this.salesPrice = salesPrice;
    this.purchasePrice = purchasePrice;
    this.stock = stock;
    this.showInCatalog = showInCatalog;
    this.urlImage = urlImage;
  }
}