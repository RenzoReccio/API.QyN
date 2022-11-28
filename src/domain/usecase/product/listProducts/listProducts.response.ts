import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/domain/model/interface/product.interface";

export class ListProductsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  showInCatalog: boolean;

  @ApiProperty()
  urlImage: string;
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.type = product?.category?.name ?? '';
    this.showInCatalog = product.showInCatalog;
    this.urlImage = product.urlImage;
  }
}