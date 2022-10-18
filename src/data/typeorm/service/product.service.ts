import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/model/interface/product.interface';
import { ProductRepository } from 'src/domain/repository/product.repository';
import { In } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class ProductService implements ProductRepository {
  async getByIds(ids: number[]): Promise<Product[]> {
    return await ProductEntity.find({  where: { id: In(ids) } });
  }
  
  async findAllCatalog(relations?: string[]): Promise<Product[]> {
    return await ProductEntity.find({ relations: relations ?? [], where: { showInCatalog: true } });
  }

  async getOneByCode(code: string): Promise<Product> {
    return await ProductEntity.findOne({ where: { code: code } });
  }

  async insert(product: Product): Promise<Product> {
    return await ProductEntity.create(product).save();
  }

  async findAll(relations?: string[]): Promise<Product[]> {
    return await ProductEntity.find({ relations: relations ?? [] });
  }
}
