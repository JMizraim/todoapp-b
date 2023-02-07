import { body } from 'express-validator';
import { validateFields, verifyJWT } from '../middlewares';

export class AuthValidations {
  private constructor() {}

  private static validateBody = [
    body('email').isEmail().withMessage('El correo electrónico no es válido.'),
    body('password')
      .isString()
      .withMessage('El valor de la contraseña no es válida.')
      .bail()
      .isLength({ min: 3 })
      .withMessage('La contraseña es requerida.'),
    validateFields,
  ];

  public static validateLogin = this.validateBody;
  public static validateRegisterBody = [
    body('name')
      .isString()
      .withMessage('El nombre no es válido.')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres.'),
    ...this.validateBody,
  ];
  public static validateRenewToken = [verifyJWT];
}
