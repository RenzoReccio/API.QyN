import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'src/domain/usecase/product/createProduct/createProduct.dto';
import { CreateProductResponse } from 'src/domain/usecase/product/createProduct/createProduct.response';
import { CreateProductUseCase } from 'src/domain/usecase/product/createProduct/createProduct.usecase';
import { ListCatalogResponse } from 'src/domain/usecase/product/listCatalog/listCatalog.response';
import { ListCatalogUseCase } from 'src/domain/usecase/product/listCatalog/listCatalog.usecase';
import { ListMovementsResponse } from 'src/domain/usecase/product/listMovements/listMovements.response';
import { ListMovementsUseCase } from 'src/domain/usecase/product/listMovements/listMovements.usecase';
import { ListProductByIdResponse } from 'src/domain/usecase/product/listProductById/listProductById.response';
import { ListProductByIdUseCase } from 'src/domain/usecase/product/listProductById/listProductById.usecase';
import { ListProductsResponse } from 'src/domain/usecase/product/listProducts/listProducts.response';
import { ListProductsUseCase } from 'src/domain/usecase/product/listProducts/listProducts.usecase';
import { UpdateProductDto } from 'src/domain/usecase/product/updateProduct/updateProduct.dto';
import { UpdateProductResponse } from 'src/domain/usecase/product/updateProduct/updateProduct.response';
import { UpdateProductUseCase } from 'src/domain/usecase/product/updateProduct/updateProduct.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly listCatalogUseCase: ListCatalogUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly listProductByIdUseCase: ListProductByIdUseCase,
    private readonly listMovementsUseCase: ListMovementsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {
  }

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

  @Get('')
  @ApiResponse({ type: ListProductsResponse, isArray: true, status: 200 })
  async getProducts() {
    let products = await this.listProductsUseCase.get();
    let response = new CustomResponse<ListProductsResponse[]>(
      `Productos encontrados: ${products.length}.`,
      products,
      null
    )
    return response;
  }


  @Get(':id')
  @ApiResponse({ type: ListProductByIdResponse, isArray: false, status: 200 })
  async getProductById(@Param('id') id: string) {
    let product = await this.listProductByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListProductByIdResponse>(
      `Producto con id: ${product.id} encontrado.`,
      product,
      null
    )
    return response;
  }

  @Get(':id/movement')
  @ApiResponse({ type: ListMovementsResponse, isArray: false, status: 200 })
  async getMovementsByProductId(@Param('id') id: string) {
    let product = await this.listMovementsUseCase.get(Number(id));
    let response = new CustomResponse<ListMovementsResponse[]>(
      `Movimientos del producto con id: ${id} encontrados.`,
      product,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreateProductResponse, isArray: false, status: 200 })
  async insertProduct(@Body() product: CreateProductDto) {
    let productInsert = await this.createProductUseCase.get(product);
    let response = new CustomResponse<CreateProductResponse>(
      `Producto con código: ${product.code}, registrado.`,
      productInsert,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdateProductResponse, isArray: false, status: 200 })
  async updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    product.id = Number(id);
    let productUpdate = await this.updateProductUseCase.get(product);
    let response = new CustomResponse<UpdateProductResponse>(
      `Producto con código: ${product.code}, actualizado.`,
      productUpdate,
      null
    )
    return response;
  }
}
