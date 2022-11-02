import { Inject } from "@nestjs/common";
import { ResourceAlreadyRegistered } from "src/domain/error/resourceAlreadyRegistered.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
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
    let supplier = await this._supplierRepository.findOne(dto.id);
    if (!supplier) throw new ResourceNotFound('El proveedor indicado no existe');
    
    let existingSupplier = await this._supplierRepository.findOneByRUC(dto.ruc.trim(), dto.id);
    if(existingSupplier) throw new ResourceAlreadyRegistered('El RUC indicado ya existe.')

    let supplierUpdate = new SupplierModel(dto.id, dto.ruc.trim(), dto.name.trim(), dto.area.trim(), dto.email.trim())
    supplierUpdate = await this._supplierRepository.insert(supplierUpdate);
    return new UpdateSupplierResponse(supplierUpdate.id);
  }

}