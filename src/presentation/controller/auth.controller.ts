import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { AuthUseCase } from 'src/domain/usecase/auth.usecase';
import { LoginDto } from 'src/domain/usecase/dto/auth.dto';
import { CustomResponse } from 'src/utils/response/response.model';

@Controller('login')
export class AuthController {
  constructor(
    private _authUseCase: AuthUseCase
  ) { }

  @Post('')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async login(@Body() loginDto: LoginDto, @Response() res: Res): Promise<Res<any, Record<string, any>>> {
    let bearerToken = await this._authUseCase.login(loginDto);
    let response = new CustomResponse<string>(
      `Inicio de sesión correcto.`,
      'Correcto',
      null
    )
    return res.header('Authorization', bearerToken).json(response);
  }

}
