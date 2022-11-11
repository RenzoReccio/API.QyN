import { Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { ProductModel } from "src/domain/model/product.model";
import { CategoryRepository } from "src/domain/repository/category.repository";
import { ProductRepository } from "src/domain/repository/product.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateProductDto } from "./createProduct.dto";
import { CreateProductResponse } from "./createProduct.response";

export class CreateProductUseCase implements BaseUseCase<CreateProductDto, CreateProductResponse>{

  constructor(
    @Inject('ProductRepository') private _productRepository: ProductRepository,
    @Inject('CategoryRepository') private _categoryRepository: CategoryRepository,
  ) { }

  async get(dto?: CreateProductDto): Promise<CreateProductResponse> {

    if (dto.minStock >= dto.maxStock) throw new ValidationError('El stock minimo no puede ser mayor al stock maximo.')

    let category = await this._categoryRepository.findOne(dto.categoryId);
    if (!category) throw new ResourceNotFound('La categoria no se encuentra registrada');

    let productInsert = new ProductModel(undefined,
      dto.code, dto.name, dto.salesPrice, dto.purchasePrice,
      category, dto.minStock, dto.maxStock, dto.stock,
      dto.showInCatalog, dto.urlImage
    )
    productInsert = await this._productRepository.insert(productInsert)
    return new CreateProductResponse(productInsert.id);
  }

}