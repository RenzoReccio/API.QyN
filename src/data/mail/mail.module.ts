import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { EMAIL_PASSWORD, EMAIL_USER } from 'src/utils/config/config';
import { OrderMailService } from './services/orderMail.service';

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
  providers: [OrderMailService],
  exports: [OrderMailService], // 👈 export for DI
})
export class MailModule { }
