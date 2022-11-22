import { Rol } from "src/domain/model/interface/rol.interface";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { MenuEntity } from "./menu.entity";

@Entity()
export class RolEntity extends BaseEntity implements Rol {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => MenuEntity)
  @JoinTable()
  menus: MenuEntity[]
}