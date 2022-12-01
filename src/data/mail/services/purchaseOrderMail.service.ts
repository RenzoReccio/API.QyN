import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { Order } from "src/domain/model/interface/order.interface";
import { OrderDetail } from "src/domain/model/interface/orderDetail.interface";
import { PurchaseOrder } from "src/domain/model/interface/purchaseOrder.interface";
import { PurchaseOrderDetail } from "src/domain/model/interface/purchaseOrderDetail.interface";
import { Supplier } from "src/domain/model/interface/supplier.interface";
import { User } from "src/domain/model/interface/users.interface";
import { PurchaseOrderMailRepository } from "src/domain/repository/purchaseOrderMail.repository";
import { ValidationException } from "src/utils/globalErrorHandler/validation.error";

@Injectable()
export class PurchaseOrderMailService implements PurchaseOrderMailRepository {
  constructor(private mailerService: MailerService) { }

  async sendMailToSupplier(supplier: Supplier, purchaseOrder: PurchaseOrder, purchaseOrderDetail: PurchaseOrderDetail[]): Promise<void> {
    let fullPrice = 0;
    purchaseOrderDetail.forEach(item => {
      fullPrice += item.quantity * item.purchasePrice;
    })

    if (!supplier.email && !IsEmail(supplier.email)) throw new ValidationException(['El correo del proveedor no es valido']);

    await this.mailerService.sendMail({
      to: supplier.email,
      subject: 'Solicitud de orden de compra',
      template: './purchaseOrder/purchaseOrderRegistered', // `.hbs` extension is appended automatically
      context: {
        fullPrice: fullPrice.toFixed(2),
        purchaseOrderDetail: purchaseOrderDetail.map(item => { return { name: item.product.name, quantity: item.quantity, price: item.purchasePrice.toFixed(2) } }),
        fullName: supplier.name,
        purchaseOrder: purchaseOrder,
        actualDate: this.format(new Date())
      },
    });
  }

  format(inputDate: Date) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}.${month}.${year}`;
  }

}