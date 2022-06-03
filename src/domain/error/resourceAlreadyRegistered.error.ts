import { HttpException, HttpStatus } from "@nestjs/common";

export class ResourceAlreadyRegistered extends HttpException {

  constructor(message: string) {
    super(message ?? 'Resouce already registered.', HttpStatus.CONFLICT)
  }
}