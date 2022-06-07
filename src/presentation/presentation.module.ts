import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthController } from './controller/auth.controller';
import { ClientController } from './controller/client.controller';
import { ProductController } from './controller/product.controller';
import { AuthenticationGuard } from './guard/authentication.guard';

@Module({
  imports: [DomainModule, UtilsModule],
  controllers: [
    ClientController,
    AuthController,
    ProductController
  ],
  providers: [
    AuthenticationGuard
  ]
})
export class PresentationModule {
}
