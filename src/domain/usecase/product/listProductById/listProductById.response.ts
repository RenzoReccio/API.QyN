import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/domain/model/interface/product.interface";

export class ListProductByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  salesPrice: number;

  @ApiProperty()
  purchasePrice: number;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  minStock: number;

  @ApiProperty()
  maxStock: number;
  
  @ApiProperty()
  stock: number;

  @ApiProperty()
  showInCatalog: boolean;

  @ApiProperty()
  urlImage: string;

  constructor(product: Product) {
    this.id = product.id;
    this.code = product.code;
    this.name = product.name;
    this.salesPrice = product.salesPrice;
    this.purchasePrice = product.purchasePrice;
    this.categoryId = product.category.id;
    this.minStock = product.minStock;
    this.maxStock = product.maxStock;
    this.showInCatalog = product.showInCatalog;
    this.urlImage = product.urlImage;
  }
}