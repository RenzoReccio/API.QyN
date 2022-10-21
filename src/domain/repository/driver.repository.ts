import { Driver } from "../model/interface/driver.interface";

export interface DriverRepository {
  findAll(relations?: string[]): Promise<Driver[]>;
  findOne(id: number, relations?: string[]): Promise<Driver>;
}