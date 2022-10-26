import { Person } from "../model/interface/person.interface";

export interface PersonRepository {
  insert(person: Person): Promise<Person>;
}