import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, AuthService],
  exports: [AuthService]
})
export class UtilsModule { }