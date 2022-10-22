import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/domain/model/interface/category.interface";

export class ListCategoriesResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(category: Category){
    this.id = category.id;
    this.name = category.name;
  }
}