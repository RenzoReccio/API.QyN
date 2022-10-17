import { Module, Provider } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TypeormModule } from 'src/data/typeorm/typeorm.module';
import { UtilsModule } from 'src/utils/utils.module';
import { ListOrdersUseCase } from './usecase/order/listOrders/listOrders.usecase';
import { ListOrderStatusUseCase } from './usecase/order/listOrderStatus/listOrderStatus.usecase';
import { UpdateOrderUseCase } from './usecase/order/updateOrder/updateOrder.usecase';
import { ListCatalogUseCase } from './usecase/product/listCatalog/listCatalog.usecase';


const typeOrmProviders = (): Provider[] => {
  return Reflect.getMetadata('providers', TypeormModule).map((item: Function) => { return { provide: item.name.replace('Service', 'Repository'), useClass: item } })
}

const OrderUseCases = [
  ListOrdersUseCase, 
  UpdateOrderUseCase,
  ListOrderStatusUseCase
]

const ProductUseCases = [
  ListCatalogUseCase
]


@Module({
  imports: [DataModule, UtilsModule],
  exports: [
    ...OrderUseCases,
    ...ProductUseCases
  ],
  providers: [
    ...typeOrmProviders(),
    ...OrderUseCases,
    ...ProductUseCases
  ]
})
export class DomainModule { }
