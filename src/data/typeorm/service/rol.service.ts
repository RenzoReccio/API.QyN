import { Rol } from "src/domain/model/interface/rol.interface";
import { TypeDocument } from "src/domain/model/interface/typeDocument.interface";
import { RolRepository } from "src/domain/repository/rol.repository";
import { In } from "typeorm";
import { RolEntity } from "../entity/rol.entity";

export class RolService implements RolRepository {
  async findByIds(ids: number[]): Promise<Rol[]> {
    return await RolEntity.find({  where: { id: In(ids) } });
  }
  async findAll(): Promise<TypeDocument[]> {
    return await RolEntity.find<RolEntity>();
  }
  async findOne(id: number): Promise<TypeDocument> {
    return await RolEntity.findOne<RolEntity>({ where: { id: id } });
  }

}