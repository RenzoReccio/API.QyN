import { Injectable } from "@nestjs/common";
import { ProductService } from "src/data/typeorm/service/product.service";
import { ResourceAlreadyRegistered } from "../error/resourceAlreadyRegistered.error";
import { Product } from "../model/interface/product.interface";
import { ProductModel } from "../model/product.model";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductUseCase {
  private _productRepository: ProductRepository;
  constructor(
    productService: ProductService
  ) {
    this._productRepository = productService;
  }

  async getProducts(): Promise<Product[]> {
    return await this._productRepository.findAll();
  }

  async getCatalogProducts(): Promise<Product[]> {
    let products = await this._productRepository.findAll();

    return products.filter(item => item.showInCatalog === true);
  }

  async insertProduct(productDto: CreateProductDto) {
    let productInsert = new ProductModel(
      null, productDto.code.trim(), productDto.name, productDto.type,
      productDto.salesPrice, productDto.purchasePrice, productDto.stock, productDto.showInCatalog,
      productDto.urlImage
    )

    let productWithCode = await this._productRepository.getOneByCode(productInsert.code);
    if(productWithCode) throw new ResourceAlreadyRegistered('Ya existe un producto con el código: ' + productInsert.code);

    return await this._productRepository.insert(productInsert);
  }
}