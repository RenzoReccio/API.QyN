import { Inject } from "@nestjs/common";
import { SupplierModel } from "src/domain/model/supplier.model";
import { SupplierRepository } from "src/domain/repository/supplier.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateSupplierDto } from "./updateSupplier.dto";
import { UpdateSupplierResponse } from "./updateSupplier.response";

export class UpdateSupplierUseCase implements BaseUseCase<UpdateSupplierDto, UpdateSupplierResponse>{

  constructor(
    @Inject('SupplierRepository') private _supplierRepository: SupplierRepository,
  ) { }

  async get(dto?: UpdateSupplierDto): Promise<UpdateSupplierResponse> {
    let supplierUpdate = new SupplierModel(dto.id, dto.ruc, dto.name, dto.area, dto.email)
    supplierUpdate = await this._supplierRepository.insert(supplierUpdate);
    return new UpdateSupplierResponse(supplierUpdate.id);
  }

}