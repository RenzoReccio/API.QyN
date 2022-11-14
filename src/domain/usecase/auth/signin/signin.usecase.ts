import { Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
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
    let userExist = await this._userRepository.findByEmail(dto.email.trim(), []);
    if (userExist) throw new ValidationError('El correo indicado ya existe para otro usuario')

    let typeDocument = await this._typeDocumentRepository.findOne(dto.typeDocumentId);
    if (!typeDocument) throw new ResourceNotFound('El tipo documento indicado no se encuentra registrado');

    if(this.isValidNumberDocument(typeDocument.id, dto.numberDocument.trim())) throw new ValidationError('El numero de documento dado no es valido');

    let client = new ClientModel(undefined, typeDocument, dto.numberDocument.trim(), dto.companyName.trim() || (dto.firstName.trim() + ' ' + dto.lastName.trim()), '', dto.phone.trim(), dto.email.trim(), dto.address.trim());
    client = await this._clientRepository.insert(client);

    let person = new PersonModel(undefined, dto.firstName.trim(), dto.lastName.trim(), dto.surName.trim(), dto.bornDate)
    person = await this._personRepository.insert(person);

    let encryptedPassword = await this._authService.encriptPassword(dto.password.trim())
    let user = new UserModel(undefined, dto.email.trim(), encryptedPassword, true, client, person)

    user = await this._userRepository.insert(user)
    return 'Usuario creado';
  }

  private isValidNumberDocument(idTypeDocument: number, numberDocument: string) {

    //Validation DNI
    if(idTypeDocument == 1 && numberDocument.length == 8) return false;

    //Validation RUC 
    if(idTypeDocument == 2 && numberDocument.length == 11) return false;

    return true;
  }
}
