import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/model/interface/users.interface';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class UserService implements UserRepository {
  async findByclientId(clientId: number, relations?: string[]): Promise<User> {
    return await UserEntity.findOne<UserEntity>({ where: { client: clientId }, relations: relations ?? [] });
  }

  async findByToken(token: string, relations: string[]): Promise<User> {
    return await UserEntity.findOne({ relations: relations ?? [], where: { passwordChangeToken: token } });
  }

  async update(user: User): Promise<User> {
    return await UserEntity.create(user).save();
  }

  async findById(id: number, relations?: string[]): Promise<User> {
    return await UserEntity.findOne<UserEntity>({ where: { id: id }, relations: relations ?? [] });
  }

  async findAll(relations?: string[]): Promise<User[]> {
    return await UserEntity.find<UserEntity>({ relations: relations ?? [], order: { id: 'ASC' } });
  }

  async insert(user: User): Promise<User> {
    return await UserEntity.create(user).save();
  }

  async findManyByIds(ids: Set<number>): Promise<User[]> {
    return await UserEntity.findByIds(Array.from(ids));
  }

  async findByEmail(email: string, relations: string[]): Promise<User> {
    return await UserEntity.findOne({ relations: relations ?? [], where: { email: email } });
  }


}
