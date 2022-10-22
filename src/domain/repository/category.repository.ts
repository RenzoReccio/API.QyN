import { Category } from "../model/interface/category.interface";

export interface CategoryRepository {
  findAll(relations?: string[]): Promise<Category[]>;
  findOne(id: number, relations?: string[]): Promise<Category>;
}