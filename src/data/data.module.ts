import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeormModule, MailModule],
  exports: [TypeormModule]
})
export class DataModule {}
