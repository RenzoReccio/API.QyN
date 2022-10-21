import { Injectable } from "@nestjs/common";
import { TypeVehicle } from "src/domain/model/interface/typeVehicle.interface";
import { TypeVehicleRepository } from "src/domain/repository/typeVehicle.repository";
import { TypeVehicleEntity } from "../entity/typeVehicle.entity";

@Injectable()
export class TypeVehicleService implements TypeVehicleRepository {
  async findAll(): Promise<TypeVehicle[]> {
    return await TypeVehicleEntity.find<TypeVehicleEntity>();
  }
  
  async findOne(id: number): Promise<TypeVehicle> {
    return await TypeVehicleEntity.findOne<TypeVehicleEntity>({ where: { id: id } });
  }

}