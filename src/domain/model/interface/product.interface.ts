import { TypeProductEnum } from "../../../data/typeorm/enum/product.enum";

export interface Product {
  id: number;
  code: string;
  name: string;
  type: TypeProductEnum;
}