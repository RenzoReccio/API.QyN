import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class ProductService extends Repository<ProductEntity> { }
