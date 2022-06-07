import { Product } from "../model/interface/product.interface";

export interface ProductRepository {
  findAll(relations?: string[]): Promise<Product[]>;
  insert(product: Product): Promise<Product>;
  getOneByCode(code: string): Promise<Product>;
}