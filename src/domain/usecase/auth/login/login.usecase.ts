import { Inject, Injectable } from "@nestjs/common";
import { IncorrectPassword } from "src/domain/error/incorrectPassword.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { LoginDto } from "./login.dto";
import { LoginResponse } from "./login.response";

@Injectable()
export class LoginUseCase implements BaseUseCase<LoginDto, string>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _authService: AuthService
  ) {
  }

  async get(dto?: LoginDto): Promise<string> {

    let user = await this._userRepository.findByEmail(dto.userName.trim(), ['person', 'client', 'client.typeDocument']);
    if (!user) throw new ResourceNotFound(`No se encontró el usuario con correo: ${dto.userName.trim()}`);

    const isPasswordMatching: boolean = await this._authService.validatePassword(dto.password.trim(), user.password.trim());
    if (!isPasswordMatching) throw new IncorrectPassword();

    const dataToken = new LoginResponse(user)

    const token = this._authService.createToken(dataToken);
    return token;
  }

}