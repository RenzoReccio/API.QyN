import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListCategoriesResponse } from "src/domain/usecase/category/listCategories/listCategories.response";
import { ListCategoriesUseCase } from "src/domain/usecase/category/listCategories/listCategories.usecase";
import { CustomResponse } from "src/utils/response/response.model";

@Controller('category')
@ApiTags('category')
export class CategoryController {

  constructor(
    private listCategoriesUseCase: ListCategoriesUseCase
  ) { }

  @Get('')
  @ApiResponse({ type: ListCategoriesResponse, isArray: true, status: 200 })
  async getCategories() {
    let categories = await this.listCategoriesUseCase.get();
    let response = new CustomResponse<ListCategoriesResponse[]>(
      `Categorias encontrados: ${categories .length}.`,
      categories,
      null
    )
    return response;
  }
}