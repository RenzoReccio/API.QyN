import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthUseCase } from './usecase/auth.usecase';
import { ClientUseCase } from './usecase/client.usecase';
import { ProductUseCase } from './usecase/product.usecase';

@Module({
  imports: [DataModule, UtilsModule],
  exports: [
    ClientUseCase,
    AuthUseCase,
    ProductUseCase
  ],
  providers: [
    ClientUseCase,
    AuthUseCase,
    ProductUseCase
  ]
})
export class DomainModule { }
