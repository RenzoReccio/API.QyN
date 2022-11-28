import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/model/interface/product.interface';
import { ProductRepository } from 'src/domain/repository/product.repository';
import { In } from 'typeorm';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class ProductService implements ProductRepository {
  async update(product: Product): Promise<Product> {
    return await ProductEntity.create(product).save();
  }
  async findOne(id: number, relations?: string[]): Promise<Product> {
    return await ProductEntity.findOne({ relations: relations ?? [], where: { id: id } });
  }
  async updateMany(product: Product[]): Promise<Product[]> {
    return await ProductEntity.save(ProductEntity.create(product));
  }

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
    return await ProductEntity.find({ relations: relations ?? [], order: { id: 'ASC' } });
  }
}
