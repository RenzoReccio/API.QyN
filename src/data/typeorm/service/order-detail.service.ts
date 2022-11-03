import { Injectable } from '@nestjs/common';
import { OrderDetail } from 'src/domain/model/interface/orderDetail.interface';
import { OrderDetailRepository } from 'src/domain/repository/orderDetail.repository';
import { Not } from 'typeorm';
import { OrderDetailEntity } from '../entity/orderDetail.entity';

@Injectable()
export class OrderDetailService implements OrderDetailRepository {
  async listByProductId(productId: number): Promise<OrderDetail[]> {
    return await OrderDetailEntity.find({ where: { product: productId, order: { orderStatus: Not(2) } }, relations: ['order'] });
  }
  async insert(orderDetail: OrderDetail): Promise<OrderDetail> {
    return await OrderDetailEntity.create(orderDetail).save();
  }
  async insertMany(orderDetail: OrderDetail[]): Promise<OrderDetail[]> {
    return await OrderDetailEntity.save(OrderDetailEntity.create(orderDetail));
  }
}
