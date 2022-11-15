import { Injectable } from '@nestjs/common';
import { UserRol } from 'src/domain/model/interface/userRol.interface';
import { UserRolRepository } from 'src/domain/repository/userRol.repository';
import { UserRolEntity } from '../entity/userRol.entity';

@Injectable()
export class UserRolService implements UserRolRepository {
  async findByUserId(userId: number, relations?: string[]): Promise<UserRol[]> {
    return await UserRolEntity.find<UserRolEntity>({ where: { user: { id: userId } }, relations: relations ?? [] });
  }

}