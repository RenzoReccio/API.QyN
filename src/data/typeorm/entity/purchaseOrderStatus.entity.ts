import { PurchaseOrderStatus } from "src/domain/model/interface/purchaseOrderStatus.interface";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PurchaseOrderStatusEntity extends BaseEntity implements PurchaseOrderStatus {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}