import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from 'src/utils/config/config';
import { ClientService } from './service/client.service';
import { OrderDetailService } from './service/order-detail.service';
import { OrderService } from './service/order.service';
import { OrderStatusService } from './service/orderStatus.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';
import { VehicleService } from './service/vehicle.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: DB_HOST(),
        port: Number(DB_PORT()),
        username: DB_USER(),
        password: DB_PASSWORD(),
        database: DB_DATABASE(),
        synchronize: true,
        logging: false,
        entities: [join(__dirname, './entity/*.entity{.ts,.js}')],
      })
    }),
  ],
  exports: [
    ClientService,
    OrderDetailService,
    OrderService,
    ProductService,
    UserService,
    OrderStatusService,
    VehicleService
  ],
  providers: [
    ClientService,
    OrderDetailService,
    OrderService,
    ProductService,
    UserService,
    OrderStatusService,
    VehicleService
  ]
})
export class TypeormModule { }
