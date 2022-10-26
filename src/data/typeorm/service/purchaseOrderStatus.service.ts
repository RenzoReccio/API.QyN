import { Injectable } from "@nestjs/common";
import { PurchaseOrderStatus } from "src/domain/model/interface/purchaseOrderStatus.interface";
import { PurchaseOrderStatusRepository } from "src/domain/repository/purchaseOrderStatus.respository";
import { PurchaseOrderStatusEntity } from "../entity/purchaseOrderStatus.entity";

@Injectable()
export class PurchaseOrderStatusService implements PurchaseOrderStatusRepository {
  async findAll(): Promise<PurchaseOrderStatus[]> {
    return await PurchaseOrderStatusEntity.find();
  }

  async findOne(id: number): Promise<PurchaseOrderStatus> {
    return await PurchaseOrderStatusEntity.findOne({ where: { id: id } });
  }
}