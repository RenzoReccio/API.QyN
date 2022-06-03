import { User } from "../model/interface/users.interface";

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
}