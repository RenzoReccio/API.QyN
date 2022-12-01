import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListCategoriesResponse } from "src/domain/usecase/category/listCategories/listCategories.response";
import { ListCategoriesUseCase } from "src/domain/usecase/category/listCategories/listCategories.usecase";
import { ListForDashboardResponse } from "src/domain/usecase/dashboard/listForDashBoard/listForDashboard.response";
import { ListForDashboardUseCase } from "src/domain/usecase/dashboard/listForDashBoard/listForDashboard.usecase";
import { CustomResponse } from "src/utils/response/response.model";

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {

  constructor(
    private listForDashboardUseCase: ListForDashboardUseCase
  ) { }

  @Get('')
  @ApiResponse({ type: ListForDashboardResponse, isArray: false, status: 200 })
  async get() {
    let dashboard = await this.listForDashboardUseCase.get();
    let response = new CustomResponse<ListForDashboardResponse>(
      `Dashboard.`,
      dashboard,
      null
    )
    return response;
  }
}