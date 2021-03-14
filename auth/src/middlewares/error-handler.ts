import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validations-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (err instanceof RequestValidationError) {

    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: [{ message: err.serializeErrors() }] })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};