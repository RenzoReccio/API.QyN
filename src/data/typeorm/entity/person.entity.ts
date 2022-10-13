import { Person } from "src/domain/model/interface/person.interface";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PersonEntity extends BaseEntity implements Person {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  
  @Column()
  lastName: string;

  @Column()
  surName: string;

  @Column()
  bornDate: Date;
}