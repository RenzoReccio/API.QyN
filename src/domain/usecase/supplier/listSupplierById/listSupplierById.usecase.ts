import { Inject } from "@nestjs/common";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListSupplierByIdResponse } from "./listSupplierById.response";

export class ListSupplierByIdUseCase implements BaseUseCase<number, ListSupplierByIdResponse> {
  constructor(
    @Inject('SupplierRepository') private _supplierRepository: SupplierRepository,

  ) { }

  async get(dto: number): Promise<ListSupplierByIdResponse> {
    let supplier = await this._supplierRepository.findOne(dto)
    return new ListSupplierByIdResponse(supplier);
  }

}