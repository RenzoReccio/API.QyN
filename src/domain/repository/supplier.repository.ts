import { Supplier } from "../model/interface/supplier.interface";

export interface SupplierRepository {
  findAll(relations?: string[]): Promise<Supplier[]>;
  findOne(id: number, relations?: string[]): Promise<Supplier>;
  insert(supplier: Supplier): Promise<Supplier>;
  update(supplier: Supplier): Promise<Supplier>;
}