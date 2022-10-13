import { Driver } from "src/domain/model/interface/driver.interface";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { TypeDocumentEntity } from "./typeDocument.entity";

@Entity()
export class DriverEntity extends BaseEntity implements Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TypeDocumentEntity)
  typeDocument: TypeDocumentEntity;

  @Column()
  numberDocument: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn()
  person: PersonEntity;

  @Column()
  licenseUrlFile: string;
}