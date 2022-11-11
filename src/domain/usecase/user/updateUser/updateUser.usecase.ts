import { Inject } from "@nestjs/common";
import { ValidationError } from "src/domain/error/validation.error";
import { PersonModel } from "src/domain/model/person.model";
import { UserModel } from "src/domain/model/user.model";
import { PersonRepository } from "src/domain/repository/person.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateUserDto } from "./updateUser.dto";
import { UpdateUserResponse } from "./updateUser.response";

export class UpdateUserUseCase implements BaseUseCase<UpdateUserDto, UpdateUserResponse>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    @Inject('PersonRepository') private _personRepository: PersonRepository,
  ) {
  }

  async get(dto: UpdateUserDto): Promise<UpdateUserResponse> {

    let userExist = await this._userRepository.findById(dto.id, ['person']);
    if (!userExist) throw new ValidationError('No existe el usuario indicado')

    let person = new PersonModel(userExist.person.id, dto.firstName, dto.lastName, dto.surName, dto.bornDate)
    person = await this._personRepository.update(person);

    let user = new UserModel(userExist.id, undefined, undefined, dto.isActive, undefined, undefined)
    user = await this._userRepository.update(user)

    return new UpdateUserResponse(user.id);
  }
}