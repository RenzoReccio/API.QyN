import { Inject } from "@nestjs/common";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListSuppliersResponse } from "./listSuppliers.response";

export class ListSuppliersUseCase implements BaseUseCase<null, ListSuppliersResponse[]>{
  constructor(
    @Inject('SupplierRepository') private _supplierRepository: SupplierRepository,

  ){}
  async get(dto?: null): Promise<ListSuppliersResponse[]> {
    let suppliers = await this._supplierRepository.findAll()
    return suppliers.map(item => { return new ListSuppliersResponse(item) });
  }

}