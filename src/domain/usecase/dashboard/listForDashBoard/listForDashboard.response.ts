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

export class ProductListForDashboardResponse {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: ListProductsResponse, isArray: true })
  productsInCatalog: ListProductsResponse[];

  @ApiProperty({ type: ListProductsResponse, isArray: true })
  productsInactive: ListProductsResponse[];

  @ApiProperty({ type: ListProductsResponse, isArray: true })
  productsWithoutStock: ListProductsResponse[];
}

export class SimpleList {
  @ApiProperty()
  name: string;

  @ApiProperty()
  total: number;
}

export class OrderForDashboardResponse {
  @ApiProperty()
  totalOfOrdersFinished: number;

  @ApiProperty({ type: SimpleList, isArray: true })
  orderByState: SimpleList[];
}

export class PurchaseOrderForDashboardResponse {
  total: number;
  @ApiProperty({ type: SimpleList, isArray: true })
  purchaseOrderByState: SimpleList[];
}

export class ListForDashboardResponse {
  @ApiProperty({ type: ProductListForDashboardResponse })
  product: ProductListForDashboardResponse

  @ApiProperty({ type: OrderForDashboardResponse })
  order: OrderForDashboardResponse

  @ApiProperty({ type: PurchaseOrderForDashboardResponse })
  purchaseOrder: PurchaseOrderForDashboardResponse

}