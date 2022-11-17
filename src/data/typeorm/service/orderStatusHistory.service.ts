import { OrderStatusHistory } from "src/domain/model/interface/orderStatusHistory.interface";
import { OrderStatusHistoryRepository } from "src/domain/repository/orderStatusHistory.repository";
import { OrderStatusHistoryEntity } from "../entity/orderStatusHistory.entity";

export class OrderStatusHistoryService implements OrderStatusHistoryRepository {
  async insert(orderStatusHistory: OrderStatusHistory): Promise<OrderStatusHistory> {
    return await OrderStatusHistoryEntity.create(orderStatusHistory).save();
  }
  async findByOrderId(orderId: number, relations?: string[]): Promise<OrderStatusHistory[]> {
    return await OrderStatusHistoryEntity.find({
      where: { order: orderId }, relations: relations ?? [], order: { createdAt: 'ASC' }
    })
  }
}