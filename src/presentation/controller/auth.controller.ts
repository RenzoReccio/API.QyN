import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { LoginDto } from 'src/domain/usecase/auth/login/login.dto';
import { LoginUseCase } from 'src/domain/usecase/auth/login/login.usecase';
import { SignInDto } from 'src/domain/usecase/auth/signin/signin.dto';
import { SigInUseCase } from 'src/domain/usecase/auth/signin/signin.usecase';

import { CustomResponse } from 'src/utils/response/response.model';

@Controller('')
export class AuthController {
  constructor(
    private _loginUseCase: LoginUseCase,
    private _sigInUseCase: SigInUseCase,

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
    return res.header('Authorization', bearerToken).json(response);
  }

  @Post('signin')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async sigIn(@Body() signInDto: SignInDto) {
    let sigInResponse = await this._sigInUseCase.get(signInDto);
    let response = new CustomResponse<string>(
      `Inicio de sesión correcto.`,
      sigInResponse,
      null
    )
    return response;
  }
}
