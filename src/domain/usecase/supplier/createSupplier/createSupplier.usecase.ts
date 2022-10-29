import { Inject } from "@nestjs/common";
import { SupplierModel } from "src/domain/model/supplier.model";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateSupplierDto } from "./createSupplier.dto";
import { CreateSupplierResponse } from "./createSupplier.response";

export class CreateSupplierUseCase implements BaseUseCase<CreateSupplierDto, CreateSupplierResponse>{

  constructor(
    @Inject('SupplierRepository') private _supplierRepository: SupplierRepository,
  ) { }

  async get(dto?: CreateSupplierDto): Promise<CreateSupplierResponse> {
    let supplierInsert = new SupplierModel(undefined, dto.ruc, dto.name, dto.area, dto.email)
    supplierInsert = await this._supplierRepository.insert(supplierInsert);
    return new CreateSupplierResponse(supplierInsert.id);
  }

}