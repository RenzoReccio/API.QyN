import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListClientByIdResponse } from "src/domain/usecase/client/listClientById/listClientById.response";
import { ListClientByIdUseCase } from "src/domain/usecase/client/listClientById/listClientById.usecase";
import { ListClientsResponse } from "src/domain/usecase/client/listClients/listClients.response";
import { ListClientsUseCase } from "src/domain/usecase/client/listClients/listClients.usecase";
import { UpdateClientDto } from "src/domain/usecase/client/updateClient/updateClient.dto";
import { UpdateClientResponse } from "src/domain/usecase/client/updateClient/updateClient.response";
import { UpdateClientUseCase } from "src/domain/usecase/client/updateClient/updateClient.usecase";
import { CustomResponse } from "src/utils/response/response.model";

@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(
    private listClientsUseCase: ListClientsUseCase,
    private listClientByIdUseCase: ListClientByIdUseCase,
    private updateClientUseCase: UpdateClientUseCase,
  ) { }

  @Get('')
  @ApiResponse({ type: ListClientsResponse, isArray: true, status: 200 })
  async getClients() {
    let clients = await this.listClientsUseCase.get();
    let response = new CustomResponse<ListClientsResponse[]>(
      `Clients encontrados: ${clients.length}.`,
      clients,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ListClientByIdResponse, isArray: false, status: 200 })
  async getClient(@Param('id') id: string) {

    let client = await this.listClientByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListClientByIdResponse>(
      `Cliente encontrado con id: ${client.id}.`,
      client,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdateClientResponse, isArray: false, status: 200 })
  async updateClient(@Param('id') id: string, @Body() clientDto: UpdateClientDto) {
    clientDto.id = Number(id);
    let clientUpdated = await this.updateClientUseCase.get(clientDto);
    let response = new CustomResponse<UpdateClientResponse>(
      `Cliente actualizado con id: ${clientUpdated.id}.`,
      clientUpdated,
      null
    )
    return response;
  }
}