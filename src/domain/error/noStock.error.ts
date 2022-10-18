import { HttpException, HttpStatus } from "@nestjs/common";

export class NoStock extends HttpException {

  constructor(message: string) {
    super(message ?? 'No Stock.', HttpStatus.CONFLICT)
  }
}