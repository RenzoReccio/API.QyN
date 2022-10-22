import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
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
}