import { Injectable } from "@nestjs/common";
import { Supplier } from "src/domain/model/interface/supplier.interface";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { Not } from "typeorm";
import { SupplierEntity } from "../entity/supplier.entity";

@Injectable()
export class SupplierService implements SupplierRepository {
  async findOneByRUC(ruc: string, id: number): Promise<Supplier> {
    return await SupplierEntity.findOne<SupplierEntity>({ where: { id: Not(id), ruc: ruc } });
  }

  async insert(supplier: Supplier): Promise<Supplier> {
    return await SupplierEntity.create(supplier).save();
  }

  async update(supplier: Supplier): Promise<Supplier> {
    return await SupplierEntity.create(supplier).save();
  }

  async findAll(relations?: string[]): Promise<Supplier[]> {
    return await SupplierEntity.find<SupplierEntity>({ relations: relations ?? [], order: { id: 'ASC' } });
  }

  async findOne(id: number, relations?: string[]): Promise<Supplier> {
    return await SupplierEntity.findOne<SupplierEntity>({ relations: relations ?? [], where: { id: id } });
  }
}