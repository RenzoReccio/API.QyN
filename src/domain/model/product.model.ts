import { Category } from "./interface/category.interface";
import { Product } from "./interface/product.interface";

export class ProductModel implements Product {
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

  constructor(id: number, code: string, name: string,
    salesPrice: number, purchasePrice: number, category: Category,
    minStock: number, maxStock: number, stock: number, showInCatalog: boolean,
    urlImage: string) {
      this.id = id;
      this.code = code;
      this.name = name;
      this.salesPrice = salesPrice;
      this.purchasePrice = purchasePrice;
      this.category = category;
      this.minStock = minStock;
      this.maxStock = maxStock;
      this.stock = stock;
      this.showInCatalog = showInCatalog;
      this.urlImage = urlImage;
  }
}