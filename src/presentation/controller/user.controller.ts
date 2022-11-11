import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListUsersResponse } from 'src/domain/usecase/user/listUsers/listUsers.response';
import { ListUsersUseCase } from 'src/domain/usecase/user/listUsers/listUsers.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private listUsersUseCase: ListUsersUseCase
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

}
