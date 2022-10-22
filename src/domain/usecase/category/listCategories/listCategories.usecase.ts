import { Inject } from "@nestjs/common";
import { CategoryRepository } from "src/domain/repository/category.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListCategoriesResponse } from "./listCategories.response";

export class ListCategoriesUseCase implements BaseUseCase<null, ListCategoriesResponse[]>{

  constructor(
    @Inject('CategoryRepository') private _categoryRepository: CategoryRepository,
  ) { }

  async get(dto?: null): Promise<ListCategoriesResponse[]> {

    let categories = await this._categoryRepository.findAll();

    return categories.map(item => { return new ListCategoriesResponse(item) })
  }

}