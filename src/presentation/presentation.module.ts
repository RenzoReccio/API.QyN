import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthController } from './controller/auth.controller';
import { CategoryController } from './controller/category.controller';
import { ClientController } from './controller/client.controller';
import { DriverController } from './controller/driver.controller';
import { OrderController } from './controller/order.controller';
import { OrderVehicleController } from './controller/orderVehicle.controller';
import { ProductController } from './controller/product.controller';
import { PurchaseOrderController } from './controller/purchaseOrder.controller';
import { RolController } from './controller/rol.controller';
import { SupplierController } from './controller/supplier.controller';
import { TypeDocumentController } from './controller/typeDocument.controller';
import { TypeVehicleController } from './controller/typeVehicle.controller';
import { UserController } from './controller/user.controller';
import { VehicleController } from './controller/vehicle.controller';
import { AuthenticationGuard } from './guard/authentication.guard';

@Module({
  imports: [DomainModule, UtilsModule, ],
  controllers: [
    ClientController,
    AuthController,
    ProductController,
    OrderController,
    VehicleController,
    DriverController,
    TypeVehicleController,
    CategoryController,
    TypeDocumentController,
    PurchaseOrderController,
    SupplierController,
    OrderVehicleController,
    UserController,
    RolController
  ],
  providers: [
    AuthenticationGuard,
  ]
})
export class PresentationModule {
}
