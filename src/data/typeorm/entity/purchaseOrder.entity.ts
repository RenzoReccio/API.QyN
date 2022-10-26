import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchaseOrderDetailEntity } from "./purchaseOrderDetail.entity";
import { PurchaseOrderStatusEntity } from "./purchaseOrderStatus.entity";
import { SupplierEntity } from "./supplier.entity";

@Entity()
export class PurchaseOrderEntity extends BaseEntity implements PurchaseOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>SupplierEntity)
  supplier: SupplierEntity;

  @Column()
  arrivalDate: Date;

  @Column()
  comments: string;

  @ManyToOne(() => PurchaseOrderStatusEntity)
  purchaseOrderStatus: PurchaseOrderStatusEntity;

  @OneToMany(() => PurchaseOrderDetailEntity, (purchaseOrderDetailEntity) => purchaseOrderDetailEntity.purchaseOrder)
  purchaseOrderDetails: PurchaseOrderDetailEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}