import { Injectable } from '@nestjs/common';
import { PurchaseOrderDetail } from 'src/domain/model/interface/purchaseOrderDetail.interface';
import { PurchaseOrderDetailRepository } from 'src/domain/repository/purchaseOrderDetail.repository';
import { PurchaseOrderDetailEntity } from '../entity/purchaseOrderDetail.entity';

@Injectable()
export class PurchaseOrderDetailService implements PurchaseOrderDetailRepository {
  async insert(purchaseOrderDetail: PurchaseOrderDetail): Promise<PurchaseOrderDetail> {
    return await PurchaseOrderDetailEntity.create(purchaseOrderDetail).save();
  }
  async insertMany(purchaseOrderDetail: PurchaseOrderDetail[]): Promise<PurchaseOrderDetail[]> {
    return await PurchaseOrderDetailEntity.save(PurchaseOrderDetailEntity.create(purchaseOrderDetail));
  } 
}
