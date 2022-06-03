import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from '../entity/orderDetail.entity';

@Injectable()
export class OrderDetailService extends Repository<OrderDetailEntity>{}
