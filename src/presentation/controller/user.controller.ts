import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListUserByIdResponse } from 'src/domain/usecase/user/listUserById/listUserById.response';
import { ListUserByIdUseCase } from 'src/domain/usecase/user/listUserById/listUserById.usecase';
import { ListUsersResponse } from 'src/domain/usecase/user/listUsers/listUsers.response';
import { ListUsersUseCase } from 'src/domain/usecase/user/listUsers/listUsers.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private listUsersUseCase: ListUsersUseCase,
    private listUserByIdUseCase: ListUserByIdUseCase

  ){}

  @Get('')
  @ApiResponse({ type: ListUsersResponse, isArray: true, status: 200 })
  async getUsers() {
    let users = await this.listUsersUseCase.get();
    let response = new CustomResponse<ListUsersResponse[]>(
      `Usuarios encontrados: ${users.length}.`,
      users,
      null
    )
    return response;
  }

  @Get(':id')
  @ApiResponse({ type: ListUserByIdResponse, isArray: false, status: 200 })
  async getOneUser(@Param('id') id: number) {
    let user = await this.listUserByIdUseCase.get(Number(id));
    let response = new CustomResponse<ListUserByIdResponse>(
      `Usuario con id: ${id} encontrado.`,
      user,
      null
    )
    return response;
  }
}
