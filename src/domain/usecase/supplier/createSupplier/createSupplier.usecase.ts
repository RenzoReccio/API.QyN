import { Inject } from "@nestjs/common";
import { ResourceAlreadyRegistered } from "src/domain/error/resourceAlreadyRegistered.error";
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
    let existingSupplier = await this._supplierRepository.findOneByRUC(dto.ruc.trim(), 0);
    if(existingSupplier) throw new ResourceAlreadyRegistered('El RUC indicado ya existe.')
    
    let supplierInsert = new SupplierModel(undefined, dto.ruc.trim(), dto.name.trim(), dto.area.trim(), dto.email.trim())
    supplierInsert = await this._supplierRepository.insert(supplierInsert);
    return new CreateSupplierResponse(supplierInsert.id);
  }

}