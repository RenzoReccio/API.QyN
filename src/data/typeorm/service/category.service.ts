import { Category } from "src/domain/model/interface/category.interface";
import { CategoryRepository } from "src/domain/repository/category.repository";
import { CategoryEntity } from "../entity/category.entity";

export class CategoryService implements CategoryRepository{
  async findAll(relations?: string[]): Promise<Category[]> {
    return await CategoryEntity.find<CategoryEntity>({ relations: relations ?? [] });
  }
  async findOne(id: number, relations?: string[]): Promise<Category> {
    return await CategoryEntity.findOne<CategoryEntity>({ relations: relations ?? [], where: {id: id} });
  }

}