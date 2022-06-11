import { Module, Provider } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TypeormModule } from 'src/data/typeorm/typeorm.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthUseCase } from './usecase/auth.usecase';
import { ClientUseCase } from './usecase/client.usecase';
import { OrderUseCase } from './usecase/order.usecase';
import { ProductUseCase } from './usecase/product.usecase';

const typeOrmProviders = (): Provider[] => {
  return Reflect.getMetadata('providers', TypeormModule).map((item: Function) => { return { provide: item.name.replace('Service', 'Repository'), useClass: item } })
}

@Module({
  imports: [DataModule, UtilsModule],
  exports: [
    ClientUseCase,
    AuthUseCase,
    ProductUseCase,
    OrderUseCase
  ],
  providers: [
    ...typeOrmProviders(),
    ClientUseCase,
    AuthUseCase,
    ProductUseCase,
    OrderUseCase
  ]
})
export class DomainModule { }
