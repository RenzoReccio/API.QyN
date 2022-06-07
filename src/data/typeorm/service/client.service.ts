import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/model/interface/client.interface';
import { ClientRepository } from '../../../domain/repository/client.repository';
import { ClientEntity } from '../entity/client.entity';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class ClientService implements ClientRepository {
  async findByRuc(ruc: string): Promise<Client> {
    return await ClientEntity.findOne<ClientEntity>({ where: { ruc: ruc } });
  }
  
  async findAll(relations?: string[]): Promise<Client[]> {
    return await ClientEntity.find<ClientEntity>({ relations: relations ?? [] });
  }

  async findOne(id: number, relations?: string[]): Promise<Client> {
    return await ClientEntity.findOne<ClientEntity>({ where: { id: Number(id) }, relations: relations ?? [] });
  }

  async insert(client: Client): Promise<Client> {
    return await ClientEntity.create(client).save();
  }

  async update(client: Client): Promise<Client> {
    let clientToUpdate = await ClientEntity.findOne<ClientEntity>({ where: { id: Number(client.id) }});
    clientToUpdate.area = client.area;
    clientToUpdate.ruc = client.ruc;
    clientToUpdate.name = client.name;
    clientToUpdate.phone = client.phone;
    clientToUpdate.email = client.email;
    clientToUpdate.users = client.users.map(item => { 
      let user = new UserEntity();
      user.id = item.id;
      return user;
    })
    return await clientToUpdate.save();
  }
}
