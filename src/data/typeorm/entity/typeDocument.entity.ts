import { TypeDocument } from "src/domain/model/interface/typeDocument.interface";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TypeDocumentEntity extends BaseEntity implements TypeDocument {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}