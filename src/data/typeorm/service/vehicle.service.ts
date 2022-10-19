import { Injectable } from '@nestjs/common';
import { Vehicle } from 'src/domain/model/interface/vehicle.inteface';
import { VehicleRepository } from 'src/domain/repository/vehicle.repository';
import { VehicleEntity } from '../entity/vehicle.entity';



@Injectable()
export class VehicleService implements VehicleRepository {

  async findAll(relations?: string[]): Promise<Vehicle[]> {
    return await VehicleEntity.find<VehicleEntity>({ relations: relations ?? [] });
  }

  async findOne(id: number, relations?: string[]): Promise<Vehicle> {
    return await VehicleEntity.findOne<VehicleEntity>({ relations: relations ?? [], where: { id: id } });
  }
}
