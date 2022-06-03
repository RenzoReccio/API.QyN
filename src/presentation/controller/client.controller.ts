import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientModel } from 'src/domain/model/client.model';
import { ClientUseCase } from 'src/domain/usecase/client.usecase';
import { CreateClientDto } from 'src/domain/usecase/dto/client.dto';
import { CustomResponse } from 'src/utils/response/response.model';
import { AuthenticationGuard } from '../guard/authentication.guard';

@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(
    private readonly clientUseCase: ClientUseCase
  ) {
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @ApiResponse({ type: ClientModel, isArray: true, status: 200 })
  async getClients(): Promise<CustomResponse<ClientModel[]>> {
    let clients = await this.clientUseCase.getClients();
    let response = new CustomResponse<ClientModel[]>(
      `Clientes encontrados: ${clients.length}.`,
      clients,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ClientModel, isArray: false, status: 200 })
  async getOneClient(@Param('id') id: number): Promise<CustomResponse<ClientModel>> {
    let client = await this.clientUseCase.getOneClient(id);
    let response = new CustomResponse<ClientModel>(
      `Cliente con RUC: ${client.ruc}, encontrado.`,
      client,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: ClientModel, isArray: false, status: 200 })
  async insertClient(@Body() client: CreateClientDto): Promise<CustomResponse<ClientModel>> {
    let clientInsert = await this.clientUseCase.insertClient(client);
    let response = new CustomResponse<ClientModel>(
      `Cliente con RUC: ${client.ruc}, registrado.`,
      clientInsert,
      null
    )
    return response;
  }



}
