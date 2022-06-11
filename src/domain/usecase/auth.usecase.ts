import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/data/typeorm/service/user.service";
import { IAuthService } from "src/utils/auth/auth.inteface";
import { AuthService } from "src/utils/auth/auth.service";
import { DataStoredInToken } from "src/utils/auth/models/auth.interface";
import { IncorrectPassword } from "../error/incorrectPassword.error";
import { ResourceNotFound } from "../error/resourceNotFound.exception";
import { UserRepository } from "../repository/user.repository";
import { LoginDto } from "./dto/auth.dto";

@Injectable()
export class AuthUseCase {
  private _userRepository: UserRepository
  private _authService: IAuthService;
  constructor(
    @Inject('UserRepository') userRepository: UserRepository,
    authService: AuthService
  ) {
    this._userRepository = userRepository;
    this._authService = authService;
  }

  async login(loginDto: LoginDto): Promise<string> {
    let user = await this._userRepository.findByEmail(loginDto.email.trim());
    if (!user) throw new ResourceNotFound(`No se encontró el usuario con correo: ${loginDto.email.trim()}`);

    const isPasswordMatching: boolean = await this._authService.validatePassword(loginDto.password.trim(), user.password.trim());
    if (!isPasswordMatching) throw new IncorrectPassword();

    const dataToken: DataStoredInToken = {
      id: user.id
    }

    const token = this._authService.createToken(dataToken);
    return token;
  }
}