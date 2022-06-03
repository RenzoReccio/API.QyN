import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DataModule, PresentationModule, DomainModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
