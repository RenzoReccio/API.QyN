import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListCatalogResponse } from 'src/domain/usecase/product/listCatalog/listCatalog.response';
import { ListCatalogUseCase } from 'src/domain/usecase/product/listCatalog/listCatalog.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly listCatalogUseCase: ListCatalogUseCase
  ) {
  }

  // @Get('')
  // @ApiResponse({ type: ProductModel, isArray: true, status: 200 })
  // async getProducts() {
  //   let products = await this.productUseCase.getProducts();
  //   let response = new CustomResponse<ProductModel[]>(
  //     `Productos encontrados: ${products.length}.`,
  //     products,
  //     null
  //   )
  //   return response;
  // }


  @Get('/catalog')
  @ApiResponse({ type: ListCatalogResponse, isArray: true, status: 200 })
  async getCatalogProducts() {
    let products = await this.listCatalogUseCase.get();
    let response = new CustomResponse<ListCatalogResponse[]>(
      `Productos encontrados: ${products.length}.`,
      products,
      null
    )
    return response;
  }

  // @Post('')
  // @ApiResponse({ type: ProductModel, isArray: false, status: 200 })
  // async insertClient(@Body() product: CreateProductDto): Promise<CustomResponse<ProductModel>> {
  //   let productInsert = await this.productUseCase.insertProduct(product);
  //   let response = new CustomResponse<ProductModel>(
  //     `Producto con código: ${product.code}, registrado.`,
  //     productInsert,
  //     null
  //   )
  //   return response;
  // }
}
