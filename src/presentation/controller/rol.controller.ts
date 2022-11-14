import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListRolsResponse } from "src/domain/usecase/rol/listRols/listRols.response";
import { ListRolsUseCase } from "src/domain/usecase/rol/listRols/listRols.usecase";
import { CustomResponse } from "src/utils/response/response.model";


@Controller('rol')
@ApiTags('rol')
export class RolController {
  constructor(
    private listRolsUseCase: ListRolsUseCase
  ){}

  @Get('')
  @ApiResponse({ type: ListRolsResponse, isArray: true, status: 200 })
  async getTypeDocuments() {
    let rols = await this.listRolsUseCase.get();
    let response = new CustomResponse<ListRolsResponse[]>(
      `Roles encontrados: ${rols.length}.`,
      rols,
      null
    )
    return response;
  }

}
