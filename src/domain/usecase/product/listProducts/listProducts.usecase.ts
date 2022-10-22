import { Inject } from "@nestjs/common";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListProductsResponse } from "./listProducts.response";

export class ListProductsUseCase implements BaseUseCase<null, ListProductsResponse[]>{

  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
  ) { }

  async get(dto?: null): Promise<ListProductsResponse[]> {
    let products = await this._productRepository.findAll(['category']);
    return products.map(item => { return new ListProductsResponse(item) });
  }

}