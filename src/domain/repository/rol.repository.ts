import { Rol } from "../model/interface/rol.interface";

export interface RolRepository {
  findAll(): Promise<Rol[]>;
  findOne(id: number): Promise<Rol>;
}