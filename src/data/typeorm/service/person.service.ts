import { Injectable } from '@nestjs/common';
import { Person } from 'src/domain/model/interface/person.interface';
import { PersonRepository } from 'src/domain/repository/person.repository';
import { PersonEntity } from '../entity/person.entity';

@Injectable()
export class PersonService implements PersonRepository {
  async insert(person: Person): Promise<Person> {
    return await PersonEntity.create(person).save();
  }
}
