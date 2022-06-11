import { Inject, Injectable } from "@nestjs/common";
import { ClientRepository } from "src/domain/repository/client.repository";
import { ResourceAlreadyRegistered } from "../error/resourceAlreadyRegistered.error";
import { ResourceNotFound } from "../error/resourceNotFound.exception";
import { ClientModel } from "../model/client.model";
import { UserModel } from "../model/user.model";
import { UserRepository } from "../repository/user.repository";
import { CreateClientDto, UpdateClientDto } from "./dto/client.dto";

@Injectable()
export class ClientUseCase {
  private _clientRepository: ClientRepository;
  private _userRepository: UserRepository

  constructor(
    @Inject('ClientRepository') clientRepositor: ClientRepository,
    @Inject('UserRepository') userRepository: UserRepository,
  ) {
    this._clientRepository = clientRepositor;
    this._userRepository = userRepository;
  }

  async getClients(): Promise<ClientModel[]> {
    return await this._clientRepository.findAll();
  }

  async getOneClient(id: number): Promise<ClientModel> {
    return await this._clientRepository.findOne(id, ['users']);
  }

  async insertClient(client: CreateClientDto): Promise<ClientModel> {
    let clientToInsert = new ClientModel(
      null, client.ruc.trim(), client.name.trim(), client.area.trim(), client.phone.trim(),
      client.email.trim(), [], []
    )

    let clientWithRUC = await this._clientRepository.findByRuc(clientToInsert.ruc);
    if (clientWithRUC) throw new ResourceAlreadyRegistered('Ya hay un cliente con el RUC indicado.');

    return await this._clientRepository.insert(clientToInsert);
  }

  async updateClient(id: number, client: UpdateClientDto) {
    let clientToUpdate = new ClientModel(
      id, client.ruc.trim(), client.name.trim(), client.area.trim(), client.phone.trim(),
      client.email.trim(), null, null
    );

    let findClient = await this._clientRepository.findOne(id);;
    if (!findClient) throw new ResourceNotFound("No existe el cliente con el Id indicado.");

    let clientWithRUC = await this._clientRepository.findByRuc(clientToUpdate.ruc);
    if (clientWithRUC && clientWithRUC.id != id) throw new ResourceAlreadyRegistered('Ya hay un cliente con el RUC indicado.');

    const usersIds = new Set([...client.users]);
    const usersValidate = await this._userRepository.findManyByIds(usersIds);
    if (usersValidate.length != usersIds.size) throw new ResourceNotFound(`Hay usuarios que no se encuentran en el request.`);

    clientToUpdate.users = client.users.map(item => new UserModel(item, null, null, null, null, null, null, null));

    return await this._clientRepository.update(clientToUpdate);

  }
} 