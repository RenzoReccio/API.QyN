import { Inject } from "@nestjs/common";
import { ValidationError } from "src/domain/error/validation.error";
import { PersonModel } from "src/domain/model/person.model";
import { UserModel } from "src/domain/model/user.model";
import { PersonRepository } from "src/domain/repository/person.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateUserDto } from "./createUser.dto";
import { CreateUserResponse } from "./createUser.response";

export class CreateUserUseCase implements BaseUseCase<CreateUserDto, CreateUserResponse>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    @Inject('PersonRepository') private _personRepository: PersonRepository,
    private _authService: AuthService
  ) {
  }

  async get(dto: CreateUserDto): Promise<CreateUserResponse> {

    let userExist = await this._userRepository.findByEmail(dto.email.trim(), []);
    if(userExist) throw new ValidationError('El correo indicado ya existe para otro usuario')

    let person = new PersonModel(undefined, dto.firstName, dto.lastName, dto.surName, dto.bornDate)
    person = await this._personRepository.insert(person);

    let encryptedPassword = await this._authService.encriptPassword(dto.password.trim())
    let user = new UserModel(undefined, dto.email.trim(), encryptedPassword, true, undefined, person)

    user = await this._userRepository.insert(user)
    return new CreateUserResponse(user.id);
  }

}
