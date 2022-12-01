import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { EMAIL_PASSWORD, EMAIL_USER } from 'src/utils/config/config';
import { AuthMailService } from './services/authMail.service';
import { OrderMailService } from './services/orderMail.service';
import { PurchaseOrderMailService } from './services/purchaseOrderMail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: "Gmail",
          port: 465,
          auth: {
            user: EMAIL_USER(),
            pass: EMAIL_PASSWORD(),
          },
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      })
    }),
  ],
  providers: [OrderMailService, AuthMailService, PurchaseOrderMailService],
  exports: [OrderMailService, AuthMailService, PurchaseOrderMailService],
})
export class MailModule { }
