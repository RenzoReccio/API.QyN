import { Inject, Injectable } from "@nestjs/common";
import { IncorrectPassword } from "src/domain/error/incorrectPassword.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { UserModel } from "src/domain/model/user.model";
import { AuthMailRepository } from "src/domain/repository/authMail.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { ChangePasswordDto } from "./changePassword.dto";
import { ChangePasswordResponse } from "./changePassword.response";

@Injectable()
export class ChangePasswordUseCase implements BaseUseCase<ChangePasswordDto, ChangePasswordResponse>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _authService: AuthService,
  ) {
  }

  async get(dto?: ChangePasswordDto): Promise<ChangePasswordResponse> {

    let user = await this._userRepository.findByToken(dto.token.trim(), []);
    if (!user) throw new ResourceNotFound(`No se ha encontrado el usuario indicado`);

    if (user.email != dto.email) throw new ValidationError('Error no se ha podido autenticar')

    let encryptedPassword = await this._authService.encriptPassword(dto.password.trim())
    let userUpdate = new UserModel(user.id, undefined, encryptedPassword, undefined, undefined, undefined, null, null)

    await this._userRepository.update(userUpdate);

    return new ChangePasswordResponse(user.email);
  }

}