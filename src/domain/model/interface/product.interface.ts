import { Category } from "./category.interface";

export interface Product {
  id: number;
  code: string;
  name: string;
  salesPrice: number;
  purchasePrice: number;
  category: Category;
  minStock: number;
  maxStock: number;
  stock: number;
  showInCatalog: boolean;
  urlImage: string;
}