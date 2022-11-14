import { Inject } from "@nestjs/common";
import { ValidationError } from "src/domain/error/validation.error";
import { PersonModel } from "src/domain/model/person.model";
import { UserModel } from "src/domain/model/user.model";
import { PersonRepository } from "src/domain/repository/person.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateUserPasswordDto } from "./updateUserPassword.dto";
import { UpdateUserPasswordResponse } from "./updateUserPassword.response";

export class UpdateUserPasswordUseCase implements BaseUseCase<UpdateUserPasswordDto, UpdateUserPasswordResponse>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _authService: AuthService
  ) {
  }

  async get(dto: UpdateUserPasswordDto): Promise<UpdateUserPasswordResponse> {
    let userExist = await this._userRepository.findById(dto.id);
    if (!userExist) throw new ValidationError('No existe el usuario indicado')

    let encryptedPassword = await this._authService.encriptPassword(dto.password.trim())
    let user = new UserModel(dto.id, undefined, encryptedPassword, undefined, undefined, undefined)

    user = await this._userRepository.update(user)
    return new UpdateUserPasswordResponse(user.id);
  }

}