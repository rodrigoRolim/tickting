import express, { Request, Response } from 'express';
import{ body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validations-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must between and 20 characters')
  ],(req: Request, res: Response) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  console.log('Creating User...')
  throw new DatabaseConnectionError();
  
  res.send({})
});

export { router as signupRouter };