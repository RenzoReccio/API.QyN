import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/domain/model/interface/product.interface";

export class ListCatalogResponse {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  salesPrice: number;
  
  @ApiProperty()
  urlImage: string;
  
  constructor(product: Product) {
    this.id = product.id;
    this.code = product.code;
    this.name = product.name;
    this.type = product?.category?.name ?? '';
    this.salesPrice = product.salesPrice;
    this.urlImage = product.urlImage;
  }
}