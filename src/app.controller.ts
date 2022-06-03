import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserEntity } from './data/typeorm/entity/users.entity';

@Controller()
export class AppController {
  constructor(
  ) { }

  @Get()
  @ApiResponse({ type: String, status: 201, description: 'The Server is working as normal.' })
  getHello(): String {
    return 'Service working';
  }
}
