import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/domain/usecase/user/createUser/createUser.dto';
import { CreateUserResponse } from 'src/domain/usecase/user/createUser/createUser.response';
import { CreateUserUseCase } from 'src/domain/usecase/user/createUser/createUser.usecase';
import { ListUserByIdResponse } from 'src/domain/usecase/user/listUserById/listUserById.response';
import { ListUserByIdUseCase } from 'src/domain/usecase/user/listUserById/listUserById.usecase';
import { ListUserRolsResponse } from 'src/domain/usecase/user/listUserRols/listUserRols.response';
import { ListUserRolsUseCase } from 'src/domain/usecase/user/listUserRols/listUserRols.usecase';
import { ListUsersResponse } from 'src/domain/usecase/user/listUsers/listUsers.response';
import { ListUsersUseCase } from 'src/domain/usecase/user/listUsers/listUsers.usecase';
import { UpdateUserDto } from 'src/domain/usecase/user/updateUser/updateUser.dto';
import { UpdateUserResponse } from 'src/domain/usecase/user/updateUser/updateUser.response';
import { UpdateUserUseCase } from 'src/domain/usecase/user/updateUser/updateUser.usecase';
import { UpdateUserPasswordDto } from 'src/domain/usecase/user/updateUserPassword/updateUserPassword.dto';
import { UpdateUserPasswordResponse } from 'src/domain/usecase/user/updateUserPassword/updateUserPassword.response';
import { UpdateUserPasswordUseCase } from 'src/domain/usecase/user/updateUserPassword/updateUserPassword.usecase';
import { UpdateUserRolsDto } from 'src/domain/usecase/user/updateUserRols/updateUserRols.dto';
import { UpdateUserRolsResponse } from 'src/domain/usecase/user/updateUserRols/updateUserRols.response';
import { UpdateUserRolsUseCase } from 'src/domain/usecase/user/updateUserRols/updateUserRols.usecase';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private listUsersUseCase: ListUsersUseCase,
    private listUserByIdUseCase: ListUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private updateUserPasswordUseCase: UpdateUserPasswordUseCase,
    private listUserRolsUseCase: ListUserRolsUseCase,
    private updateUserRolsUseCase: UpdateUserRolsUseCase,
  ) { }

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

  @Get(':id/rols')
  @ApiResponse({ type: ListUserRolsResponse, isArray: true, status: 200 })
  async getUserRols(@Param('id') id: number) {
    let rols = await this.listUserRolsUseCase.get(Number(id));
    let response = new CustomResponse<ListUserRolsResponse[]>(
      `Roles encontrados ${rols.length}.`,
      rols,
      null
    )
    return response;
  }

  @Put(':id/rols')
  @ApiResponse({ type: ListUserRolsResponse, isArray: true, status: 200 })
  async upodateUserRols(@Param('id') id: number, @Body() user: UpdateUserRolsDto) {
    user.userId = Number(id);
    let rols = await this.updateUserRolsUseCase.get(user);
    let response = new CustomResponse<UpdateUserRolsResponse>(
      `Usuario con id: ${user.userId}, actualizado.`,
      rols,
      null
    )
    return response;
  }

  @Post('')
  @ApiResponse({ type: CreateUserResponse, isArray: false, status: 200 })
  async insertUser(@Body() user: CreateUserDto) {
    let userInsert = await this.createUserUseCase.get(user);
    let response = new CustomResponse<CreateUserResponse>(
      `Usuario con id: ${userInsert.id}, registrado.`,
      userInsert,
      null
    )
    return response;
  }

  @Put(':id')
  @ApiResponse({ type: UpdateUserResponse, isArray: false, status: 200 })
  async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    user.id = Number(id);
    let userUpdate = await this.updateUserUseCase.get(user);
    let response = new CustomResponse<UpdateUserResponse>(
      `Usuario con id: ${userUpdate.id}, actualizado.`,
      userUpdate,
      null
    )
    return response;
  }

  @Put(':id/password')
  @ApiResponse({ type: UpdateUserPasswordResponse, isArray: false, status: 200 })
  async updateUserPassword(@Param('id') id: number, @Body() user: UpdateUserPasswordDto) {
    user.id = Number(id);
    let userUpdate = await this.updateUserPasswordUseCase.get(user);
    let response = new CustomResponse<UpdateUserResponse>(
      `Usuario con id: ${userUpdate.id}, actualizado.`,
      userUpdate,
      null
    )
    return response;
  }
}
