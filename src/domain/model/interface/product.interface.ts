import { TypeProductEnum } from "../../../data/typeorm/enum/product.enum";

export interface Product {
  id: number;
  code: string;
  name: string;
  type: TypeProductEnum;
  salesPrice: number;
  purchasePrice: number;
  stock: number;
  showInCatalog: boolean;
  urlImage: string;
}