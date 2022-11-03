import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/model/interface/order.interface';
import { OrderRepository } from 'src/domain/repository/order.repository';
import { In, Not } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderVehicleEntity } from '../entity/ordervehicle.entity';

@Injectable()
export class OrderService implements OrderRepository {
  async findOrdersReadyToAssign(relations?: string[]): Promise<Order[]> {
    let orderVehicle = await OrderVehicleEntity.find({ relations: ['order'] })
    let orderIds = new Set<number>(orderVehicle.map(item => { return item.order.id }))
    return await OrderEntity.find({
      relations: relations ?? [],
      where: { orderStatus: { id: 4 }, id: Not(In(Array.from(orderIds))) },
      order: { id: 'ASC' }
    })
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
