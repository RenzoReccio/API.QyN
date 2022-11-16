import { Rol } from "./interface/rol.interface";
import { UserRol } from "./interface/userRol.interface";
import { User } from "./interface/users.interface";

export class UserRolModel implements UserRol {
  id: number;
  user: User;
  rol: Rol;

  constructor(id: number, user: User, rol: Rol){
    this.id = id;
    this.user = user;
    this.rol = rol;
  }
}