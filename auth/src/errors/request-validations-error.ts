import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
/* interface CustomError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string;
  }[]
} */

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(public errors: ValidationError[]) {
    super('Invalid resquest parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param }
    });
  }
}
