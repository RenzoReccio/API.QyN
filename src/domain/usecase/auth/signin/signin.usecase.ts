import { Inject } from "@nestjs/common";
import { ClientModel } from "src/domain/model/client.model";
import { PersonModel } from "src/domain/model/person.model";
import { UserModel } from "src/domain/model/user.model";
import { ClientRepository } from "src/domain/repository/client.repository";
import { PersonRepository } from "src/domain/repository/person.repository";
import { TypeDocumentRepository } from "src/domain/repository/typeDocument.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { SignInDto } from "./signin.dto";

export class SigInUseCase implements BaseUseCase<SignInDto, string>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    @Inject('ClientRepository') private _clientRepository: ClientRepository,
    @Inject('TypeDocumentRepository') private _typeDocumentRepository: TypeDocumentRepository,
    @Inject('PersonRepository') private _personRepository: PersonRepository,
    private _authService: AuthService
  ) {
  }

  async get(dto: SignInDto): Promise<string> {
    let typeDocument = await this._typeDocumentRepository.findOne(dto.typeDocumentId);

    let client = new ClientModel(undefined, typeDocument, dto.numberDocument, dto.companyName || dto.firstName + ' ' + dto.lastName, '', dto.phone, dto.email, dto.address);
    client = await this._clientRepository.insert(client);

    let person = new PersonModel(undefined, dto.firstName, dto.lastName, dto.surName, dto.bornDate)
    person = await this._personRepository.insert(person);

    let encryptedPassword = await this._authService.encriptPassword(dto.password)
    let user = new UserModel(undefined, dto.email.trim(), encryptedPassword, true, client, person)

    user = await this._userRepository.insert(user)
    return 'Usuario creado';
  }

}
