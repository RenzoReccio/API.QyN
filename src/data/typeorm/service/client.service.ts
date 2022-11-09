import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../../../domain/model/interface/client.interface';
import { ClientRepository } from '../../../domain/repository/client.repository';
import { ClientEntity } from '../entity/client.entity';

@Injectable()
export class ClientService implements ClientRepository {


  async findByUserId(userId: number): Promise<Client> {
    return await ClientEntity.createQueryBuilder("client").leftJoinAndSelect("client.user", "user").where("user.id = :userId", { userId: userId }).leftJoinAndSelect("client.typeDocument", "typeDocument").getOne()
  }

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
    return await ClientEntity.create(client).save();
  }
}
