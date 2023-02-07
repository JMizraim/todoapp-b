import { body, param } from 'express-validator';
import { arrayWithoutFirstElement } from '../helpers';
import { isValidCategory } from './customValidations';
import { validateFields, verifyJWT } from '../middlewares';

export class CategoryValidations {
  private static validateParams = [
    verifyJWT,
    param('id', 'No es un id de MongoDB válido')
      .isMongoId()
      .bail()
      .custom(isValidCategory),
    validateFields,
  ];

  private static validateBody = [
    verifyJWT,
    body('name')
      .isString()
      .withMessage('El nombre no es válido')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El nombre debe tener al menos 3 caracteres'),
    validateFields,
  ];

  public static validateGetCategoriesByUserId = [verifyJWT];
  public static validateCreateCategory = this.validateBody;
  public static validateUpdateCategory = [
    ...this.validateParams,
    ...arrayWithoutFirstElement(this.validateBody),
  ];
  public static validateDeleteCategory = this.validateParams;
}
