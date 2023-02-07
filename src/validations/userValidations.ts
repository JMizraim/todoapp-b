import { body } from 'express-validator';
import { arrayWithoutFirstElement } from '../helpers';
import { validateFields, verifyJWT } from '../middlewares';
import { isNotEmailInUse } from './';

export class UserValidations {
  private constructor() {}

  private static validateBody = [
    verifyJWT,
    body('name')
      .isString()
      .withMessage('El nombre no es válido')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email')
      .isEmail()
      .withMessage('No es un correo electrónico válido')
      .bail()
      .custom(isNotEmailInUse),
    body('password')
      .isString()
      .withMessage('La contraseña no es válida')
      .bail()
      .isLength({ min: 4 })
      .withMessage('La contraseña debe tener al menos 4 caracteres'),
    validateFields,
  ];

  public static validateCreateUser = arrayWithoutFirstElement(
    this.validateBody
  );
  public static validateUpdateUser = this.validateBody;
  public static validateDeleteUser = [verifyJWT];
}
