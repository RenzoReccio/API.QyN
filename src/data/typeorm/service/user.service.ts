import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/model/interface/users.interface';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class UserService implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    return await UserEntity.findOne({ where: { email: email } });
  }
}
