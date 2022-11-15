import { UserRol } from "../model/interface/userRol.interface";

export interface UserRolRepository {
  findByUserId(userId: number, relations?: string[]): Promise<UserRol[]>;
}