import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/model/interface/users.interface';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class UserService implements UserRepository {
  async findManyByIds(ids: Set<number>): Promise<User[]> {
    return await UserEntity.findByIds(Array.from(ids));
  }
  
  async findByEmail(email: string, relations: string[]): Promise<User> {
    return await UserEntity.findOne({ relations: relations ?? [], where: { email: email } });
  }
}
