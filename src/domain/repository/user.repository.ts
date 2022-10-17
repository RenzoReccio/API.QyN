import { User } from "../model/interface/users.interface";

export interface UserRepository {
  findByEmail(email: string, relations: string[]): Promise<User>;
  findManyByIds(ids: Set<number>): Promise<User[]>;
}