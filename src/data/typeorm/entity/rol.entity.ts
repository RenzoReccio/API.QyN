import { Rol } from "src/domain/model/interface/rol.interface";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RolEntity extends BaseEntity implements Rol {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}