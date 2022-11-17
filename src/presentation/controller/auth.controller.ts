import { Body, Controller, Param, Post, Put, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { ChangePasswordDto } from 'src/domain/usecase/auth/changePassword/changePassword.dto';
import { ChangePasswordResponse } from 'src/domain/usecase/auth/changePassword/changePassword.response';
import { ChangePasswordUseCase } from 'src/domain/usecase/auth/changePassword/changePassword.usecase';
import { LoginDto } from 'src/domain/usecase/auth/login/login.dto';
import { LoginUseCase } from 'src/domain/usecase/auth/login/login.usecase';
import { RequestPasswordChangeDto } from 'src/domain/usecase/auth/requestPasswordChange/requestPasswordChange.dto';
import { RequestPasswordChangeUseCase } from 'src/domain/usecase/auth/requestPasswordChange/requestPasswordChange.usecase';
import { SignInDto } from 'src/domain/usecase/auth/signin/signin.dto';
import { SigInUseCase } from 'src/domain/usecase/auth/signin/signin.usecase';

import { CustomResponse } from 'src/utils/response/response.model';

@Controller('')
export class AuthController {
  constructor(
    private _loginUseCase: LoginUseCase,
    private _sigInUseCase: SigInUseCase,
    private _requestPasswordChangeUseCase: RequestPasswordChangeUseCase,
    private _changePasswordUseCase: ChangePasswordUseCase,

  ) { }

  @Post('login')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async login(@Body() loginDto: LoginDto, @Response() res: Res): Promise<Res<any, Record<string, any>>> {
    let bearerToken = await this._loginUseCase.get(loginDto);
    let response = new CustomResponse<string>(
      `Inicio de sesión correcto.`,
      'Correcto',
      null
    )
    res.setHeader('Access-Control-Expose-Headers', 'authorization'); 

    return res.header('authorization', bearerToken).json(response);
  }

  @Post('signin')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async signIn(@Body() signInDto: SignInDto) {
    let sigInResponse = await this._sigInUseCase.get(signInDto);
    let response = new CustomResponse<string>(
      `Inicio de sesión correcto.`,
      sigInResponse,
      null
    )
    return response;
  }

  @Post('changePassword/request')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async requestChangePassword(@Body() dto: RequestPasswordChangeDto) {
    let changePassword = await this._requestPasswordChangeUseCase.get(dto);
    let response = new CustomResponse<string>(
      `Correo enviado correctamente.`,
      changePassword,
      null
    )
    return response;
  }

  @Put('changePassword/:token')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async changePassword(@Body() dto: ChangePasswordDto, @Param('token') token: string) {
    dto.token = token;
    let changePassword = await this._changePasswordUseCase.get(dto);
    let response = new CustomResponse<ChangePasswordResponse>(
      `Se cambio la contraseña correctamente.`,
      changePassword,
      null
    )
    return response;
  }
}
