import { HttpException } from "@nestjs/common";

export class ValidationException extends HttpException {
  errors: string[];
  constructor(errors: string[]){
    super('BadRequest', 400)
    this.errors = errors
  }
}