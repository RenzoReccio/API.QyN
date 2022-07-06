import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/model/interface/order.interface';
import { OrderRepository } from 'src/domain/repository/order.repository';
import { OrderEntity } from '../entity/order.entity';
import { StatusOrderEnum } from '../enum/order.enum';

@Injectable()
export class OrderService implements OrderRepository {
  async getStates(): Promise<string[]> {
    return await Object.values(StatusOrderEnum);
  }
  async findOne(id: number, relations?: string[]): Promise<Order> {
    return await OrderEntity.findOne({ relations: relations ?? [], where: { id: id } });
  }

  async update(order: Order): Promise<Order> {
    return await OrderEntity.create(order).save();
  }

  async findAll(relations?: string[]): Promise<Order[]> {
    return OrderEntity.find({ relations: relations ?? [], order: { id: 'ASC' } })
  }

  async insert(order: Order): Promise<Order> {
    return await OrderEntity.create(order).save();
  }
}
