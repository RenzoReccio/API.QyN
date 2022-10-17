import { Injectable } from "@nestjs/common";
import { OrderStatus } from "src/domain/model/interface/orderStatus.interface";
import { OrderStatusRepository } from "src/domain/repository/orderStatus.repository";
import { OrderStatusEntity } from "../entity/orderStatus.entity";

@Injectable()
export class OrderStatusService implements OrderStatusRepository {
  async findAll(): Promise<OrderStatus[]> {
    return await OrderStatusEntity.find();
  }
  async findOne(id: number): Promise<OrderStatus> {
    return await OrderStatusEntity.findOne({ where: { id: id } });
  }

}