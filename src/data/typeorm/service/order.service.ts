import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/model/interface/order.interface';
import { OrderRepository } from 'src/domain/repository/order.repository';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderService implements OrderRepository{
  async insert(order: Order): Promise<Order> {
    return await OrderEntity.create(order).save();
  }
}
