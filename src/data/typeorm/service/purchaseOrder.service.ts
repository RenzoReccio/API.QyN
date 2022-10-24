import { Injectable } from "@nestjs/common";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { PurchaseOrderRepository } from "src/domain/repository/purchaseOrder.repository";
import { PurchaseOrderEntity } from "../entity/purchaseOrder.entity";

@Injectable()
export class PurchaseOrderService implements PurchaseOrderRepository {
  async insert(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    return PurchaseOrderEntity.create(purchaseOrder).save();
  }

  update(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    throw new Error("Method not implemented.");
  }

  async findAll(relations?: string[]): Promise<PurchaseOrder[]> {
    return await PurchaseOrderEntity.find({ relations: relations ?? [], order: { id: 'ASC' } })
  }

  async findOne(id: number, relations?: string[]): Promise<PurchaseOrder> {
    return await PurchaseOrderEntity.findOne({ relations: relations ?? [], where: { id: id } });
  }

}