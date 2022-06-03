import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectPassword extends HttpException {

  constructor() {
    super('Contraseña incorrecta.', HttpStatus.CONFLICT)
  }
}