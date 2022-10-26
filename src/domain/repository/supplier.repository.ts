import { Supplier } from "../model/interface/supplier.interface";

export interface SupplierRepository {
  findAll(relations?: string[]): Promise<Supplier[]>;
  findOne(id: number, relations?: string[]): Promise<Supplier>;
}