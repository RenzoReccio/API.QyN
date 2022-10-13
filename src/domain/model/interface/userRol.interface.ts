import { Rol } from "./rol.interface";
import { User } from "./users.interface";

export interface UserRol {
  id: number;
  user: User;
  rol: Rol;
}