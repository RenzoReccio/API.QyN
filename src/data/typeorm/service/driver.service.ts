import { Injectable } from "@nestjs/common";
import { Driver } from "src/domain/model/interface/driver.interface";
import { DriverRepository } from "src/domain/repository/driver.repository";
import { DriverEntity } from "../entity/driver.entity";

@Injectable()
export class DriverService implements DriverRepository {
  
  async findAll(relations?: string[]): Promise<Driver[]> {
    return await DriverEntity.find<DriverEntity>({ relations: relations ?? [] });
  }

  async findOne(id: number, relations?: string[]): Promise<Driver> {
    return await DriverEntity.findOne<DriverEntity>({ relations: relations ?? [], where: {id: id} });
  }
}