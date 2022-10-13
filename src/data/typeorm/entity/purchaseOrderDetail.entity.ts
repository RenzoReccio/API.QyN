import { Product } from "src/domain/model/interface/product.interface";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "src/domain/model/interface/purchaseOrderDetail.interface";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { PurchaseOrderEntity } from "./purchaseOrder.entity";

@Entity()
export class PurchaseOrderDetailEntity extends BaseEntity implements PurchaseOrderDetail {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => PurchaseOrderEntity, (purchaseOrderEntity) => purchaseOrderEntity.purchaseOrderDetails)
  purchaseOrder: PurchaseOrder;
  
  @ManyToOne(() => ProductEntity)
  product: Product;
  
  @Column()
  purchasePrice: number;
  
  @Column()
  quantity: number;
}