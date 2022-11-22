import { Menu } from "src/domain/model/interface/menu.interface";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren } from "typeorm";

@Entity()
export class MenuEntity extends BaseEntity implements Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  icon: string;

  @ManyToOne((type) => MenuEntity, (menuEntity) => menuEntity.childs) 
  parent: MenuEntity;

  @OneToMany((type) => MenuEntity, (menuEntity) => menuEntity.parent)
  childs: MenuEntity[];
}