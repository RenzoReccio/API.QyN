import { Rol } from "src/domain/model/interface/rol.interface";
import { UserRol } from "src/domain/model/interface/userRol.interface";
import { User } from "src/domain/model/interface/users.interface";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolEntity } from "./rol.entity";
import { UserEntity } from "./users.entity";

@Entity()
export class UserRolEntity extends BaseEntity implements UserRol {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.userRols)
  user: User;

  @ManyToOne(() => RolEntity)
  rol: Rol;
}