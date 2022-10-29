import { Injectable } from "@nestjs/common";
import { Supplier } from "src/domain/model/interface/supplier.interface";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { SupplierEntity } from "../entity/supplier.entity";

@Injectable()
export class SupplierService implements SupplierRepository {
  async insert(supplier: Supplier): Promise<Supplier> {
    return await SupplierEntity.create(supplier).save();
  }
  
  async update(supplier: Supplier): Promise<Supplier> {
    return await SupplierEntity.create(supplier).save();
  }

  async findAll(relations?: string[]): Promise<Supplier[]> {
    return await SupplierEntity.find<SupplierEntity>({ relations: relations ?? [] });
  }

  async findOne(id: number, relations?: string[]): Promise<Supplier> {
    return await SupplierEntity.findOne<SupplierEntity>({ relations: relations ?? [], where: { id: id } });
  }
}