import { Module, Provider } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TypeormModule } from 'src/data/typeorm/typeorm.module';
import { UtilsModule } from 'src/utils/utils.module';
import { LoginUseCase } from './usecase/auth/login/login.usecase';
import { ListCategoriesUseCase } from './usecase/category/listCategories/listCategories.usecase';
import { ListClientByIdUseCase } from './usecase/client/listClientById/listClientById.usecase';
import { ListClientsUseCase } from './usecase/client/listClients/listClients.usecase';
import { ListDriversUseCase } from './usecase/driver/listDrivers/listDrivers.usecase';
import { CreateClientOrderUseCase } from './usecase/order/createClientOrder/createClientOrder.usecase';
import { ListOrderByIdUseCase } from './usecase/order/listOrderById/listOrderById.usecase';
import { ListOrdersUseCase } from './usecase/order/listOrders/listOrders.usecase';
import { ListOrderStatusUseCase } from './usecase/order/listOrderStatus/listOrderStatus.usecase';
import { UpdateOrderUseCase } from './usecase/order/updateOrder/updateOrder.usecase';
import { CreateProductUseCase } from './usecase/product/createProduct/createProduct.usecase';
import { ListCatalogUseCase } from './usecase/product/listCatalog/listCatalog.usecase';
import { ListProductByIdUseCase } from './usecase/product/listProductById/listProductById.usecase';
import { ListProductsUseCase } from './usecase/product/listProducts/listProducts.usecase';
import { UpdateProductUseCase } from './usecase/product/updateProduct/updateProduct.usecase';
import { ListTypeVehiclesUseCase } from './usecase/typeVehicle/listTypeVehicles/listTypeVehicles.usecase';
import { CreateVehicleUseCase } from './usecase/vehicle/createVehicle/createVehicle.usecase';
import { ListVehicleByIdUseCase } from './usecase/vehicle/listVehicleById/listVehicleById.usecase';
import { ListVehiclesUseCase } from './usecase/vehicle/listVehicles/listVehicles.usecase';
import { UpdateVehicleUseCase } from './usecase/vehicle/updateVehicle/updateVehicle.usecase';


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
  ListCatalogUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  ListProductByIdUseCase,
  ListProductsUseCase,
]

const VehiclesUseCases = [
  ListVehiclesUseCase,
  ListVehicleByIdUseCase,
  CreateVehicleUseCase,
  UpdateVehicleUseCase
]

const DriverUseCases = [
  ListDriversUseCase
]

const TypeVehicleUseCases = [
  ListTypeVehiclesUseCase
]

const CategoryUseCases = [
  ListCategoriesUseCase
]

const ClientUseCases = [
  ListClientByIdUseCase,
  ListClientsUseCase
]

@Module({
  imports: [DataModule, UtilsModule],
  exports: [
    ...OrderUseCases,
    ...ProductUseCases,
    ...AuthUseCases,
    ...VehiclesUseCases,
    ...DriverUseCases,
    ...TypeVehicleUseCases,
    ...CategoryUseCases,
    ...ClientUseCases
  ],
  providers: [
    ...typeOrmProviders(),
    ...OrderUseCases,
    ...ProductUseCases,
    ...AuthUseCases,
    ...VehiclesUseCases,
    ...DriverUseCases,
    ...TypeVehicleUseCases,
    ...CategoryUseCases,
    ...ClientUseCases
  ]
})
export class DomainModule { }
