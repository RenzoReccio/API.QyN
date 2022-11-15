import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Order } from "src/domain/model/interface/order.interface";
import { OrderDetail } from "src/domain/model/interface/orderDetail.interface";
import { User } from "src/domain/model/interface/users.interface";
import { OrderMailRepository } from "src/domain/repository/orderMail.repository";

@Injectable()
export class OrderMailService implements OrderMailRepository {
  constructor(private mailerService: MailerService) { }

  async sendMailToClient(user: User, order: Order, orderDetail: OrderDetail[]): Promise<void> {
    let fullName = ((user.person.firstName ?? '') + ' ' + (user.person.lastName ?? '')).trim();
    let fullPrice = 0;
    orderDetail.forEach(item => {
      fullPrice += item.quantity * item.salesPrice;
    })

    if (!user.email) return;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Tu pedido fue registrado!',
      template: './order/clientRegisteredOrder', // `.hbs` extension is appended automatically
      context: {
        fullPrice: fullPrice.toFixed(2),
        orderDetail: orderDetail.map(item => { return { name: item.product.name, quantity: item.quantity, price: item.salesPrice.toFixed(2) } }),
        fullName: fullName,
        order: order
      },
    });
  }

}