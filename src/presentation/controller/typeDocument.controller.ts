import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListTypeDocumentResponse } from "src/domain/usecase/typeDocument/listTypeDocuments/listTypeDocuments.response";
import { ListTypeDocumentUseCase } from "src/domain/usecase/typeDocument/listTypeDocuments/listTypeDocuments.usecase";
import { CustomResponse } from "src/utils/response/response.model";


@Controller('typedocument')
@ApiTags('typedocument')
export class TypeDocumentController {
  constructor(
    private listTypeDocumentUseCase: ListTypeDocumentUseCase
  ){}

  @Get('')
  @ApiResponse({ type: ListTypeDocumentResponse, isArray: true, status: 200 })
  async getTypeDocuments() {
    let typeDocuments = await this.listTypeDocumentUseCase.get();
    let response = new CustomResponse<ListTypeDocumentResponse[]>(
      `Tipos Documentos encontrados: ${typeDocuments.length}.`,
      typeDocuments,
      null
    )
    return response;
  }

}
