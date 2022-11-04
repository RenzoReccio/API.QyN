import { Inject } from "@nestjs/common";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListCatalogResponse } from "./listCatalog.response";

export class ListCatalogUseCase implements BaseUseCase<null, ListCatalogResponse[]>{
  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
  ) { }


  async get(dto?: null): Promise<ListCatalogResponse[]> {
    let products = await this._productRepository.findAllCatalog(['category']);
    return products.filter(item => item.stock >= item.minStock).map(item => { return new ListCatalogResponse(item) });
  }


}