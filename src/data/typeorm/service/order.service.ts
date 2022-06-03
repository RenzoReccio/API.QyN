import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';

@Injectable()
export class OrderService extends Repository<OrderEntity>{ }
