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

    if (dto.stock > dto.maxStock || dto.stock < dto.minStock) throw new ValidationError('El stock debe estar entre el stock minimo y el stock maximo.')

    if (dto.purchasePrice > dto.salesPrice) throw new ValidationError('El precio de venta debe ser mayor al precio de compra.')

    let category = await this._categoryRepository.findOne(dto.categoryId);
    if (!category) throw new ResourceNotFound('La categoria no se encuentra registrada');

    let productCode = await this._productRepository.getOneByCode(dto.code.trim().toUpperCase());
    if (productCode) throw new ValidationError('Ya existe un producto con el codigo ingresado');

    let productInsert = new ProductModel(undefined,
      dto.code.trim().toUpperCase(), dto.name.trim(), dto.salesPrice, dto.purchasePrice,
      category, dto.minStock, dto.maxStock, dto.stock,
      dto.showInCatalog, dto.urlImage.trim()
    )
    productInsert = await this._productRepository.insert(productInsert)
    return new CreateProductResponse(productInsert.id);
  }

}