import { Module, Provider } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TypeormModule } from 'src/data/typeorm/typeorm.module';
import { UtilsModule } from 'src/utils/utils.module';
import { LoginUseCase } from './usecase/auth/login/login.usecase';
import { CreateClientOrderUseCase } from './usecase/order/createClientOrder/createClientOrder.usecase';
import { ListOrderByIdUseCase } from './usecase/order/listOrderById/listOrderById.usecase';
import { ListOrdersUseCase } from './usecase/order/listOrders/listOrders.usecase';
import { ListOrderStatusUseCase } from './usecase/order/listOrderStatus/listOrderStatus.usecase';
import { UpdateOrderUseCase } from './usecase/order/updateOrder/updateOrder.usecase';
import { ListCatalogUseCase } from './usecase/product/listCatalog/listCatalog.usecase';
import { ListVehiclesUseCase } from './usecase/vehicle/listVehicles/listVehicles.usecase';


const typeOrmProviders = (): Provider[] => {
  return Reflect.getMetadata('providers', TypeormModule).map((item: Function) => { return { provide: item.name.replace('Service', 'Repository'), useClass: item } })
}

const AuthUseCases = [
  LoginUseCase
]
const OrderUseCases = [
  ListOrdersUseCase,
  UpdateOrderUseCase,
  ListOrderStatusUseCase,
  ListOrderByIdUseCase,
  CreateClientOrderUseCase
]

const ProductUseCases = [
  ListCatalogUseCase
]

const VehiclesUseCases = [
  ListVehiclesUseCase
]

@Module({
  imports: [DataModule, UtilsModule],
  exports: [
    ...OrderUseCases,
    ...ProductUseCases,
    ...AuthUseCases,
    ...VehiclesUseCases
  ],
  providers: [
    ...typeOrmProviders(),
    ...OrderUseCases,
    ...ProductUseCases,
    ...AuthUseCases,
    ...VehiclesUseCases
  ]
})
export class DomainModule { }
