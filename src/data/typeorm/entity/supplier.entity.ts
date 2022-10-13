import { Person } from "src/domain/model/interface/person.interface";
import { Supplier } from "src/domain/model/interface/supplier.interface";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupplierEntity extends BaseEntity implements Supplier {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruc: string;
  
  @Column()
  name: string;
  
  @Column()
  area: string;
  
  @Column()
  email: string;
}