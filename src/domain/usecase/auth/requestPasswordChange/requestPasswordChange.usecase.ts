import { Inject, Injectable } from "@nestjs/common";
import { IncorrectPassword } from "src/domain/error/incorrectPassword.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { AuthMailRepository } from "src/domain/repository/authMail.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { RequestPasswordChangeDto } from "./requestPasswordChange.dto";

@Injectable()
export class RequestPasswordChangeUseCase implements BaseUseCase<RequestPasswordChangeDto, string>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    private _authService: AuthService,
    @Inject('AuthMailRepository') private _authMailRepository: AuthMailRepository,
  ) {
  }

  async get(dto?: RequestPasswordChangeDto): Promise<string> {

    let user = await this._userRepository.findByEmail(dto.userName.trim(), ['person', 'client', 'client.typeDocument']);
    if (!user) throw new ResourceNotFound(`No existe el usuario con correo: ${dto.userName.trim()}`);

    let randomToken = await this._authService.generateRandomToken();
    user.passwordChangeRequestedDate = new Date();
    user.passwordChangeToken = randomToken;
    await this._authMailRepository.sendMailToChangePassword(user);
    await this._userRepository.update(user);


    return 'Se envio un correo con la informacion requerida.';
  }

}