import { Inject } from "@nestjs/common";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListProductByIdResponse } from "./listProductById.response";

export class ListProductByIdUseCase implements BaseUseCase<number, ListProductByIdResponse> {
  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
  ){}
  async get(id?: number): Promise<ListProductByIdResponse> {
    let product = await this._productRepository.findOne(id, ['category'])
    return new ListProductByIdResponse(product);
  }

}