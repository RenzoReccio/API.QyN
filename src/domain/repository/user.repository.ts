import { User } from "../model/interface/users.interface";

export interface UserRepository {
  findByEmail(email: string, relations: string[]): Promise<User>;
  findByToken(token: string, relations: string[]): Promise<User>;
  findManyByIds(ids: Set<number>): Promise<User[]>;
  insert(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findAll(relations?: string[]): Promise<User[]>;
  findById(id: number, relations?: string[]): Promise<User>;
  findByclientId(clientId: number, relations?: string[]): Promise<User>;
}