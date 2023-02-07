import { body, param } from 'express-validator';
import { ObjectId } from 'mongodb';
import { arrayWithoutFirstElement } from '../helpers';
import { validateFields, verifyJWT } from '../middlewares';
import { buildSubtasks } from './customSanatizers';
import { isValidCategory, isValidTask } from './customValidations';

export class TaskValidations {
  private constructor() {}

  private static validateParams = [
    verifyJWT,
    param('id')
      .isMongoId()
      .withMessage('No es un id de MongoDB válido')
      .bail()
      .custom(isValidTask),
    validateFields,
  ];

  private static validateBody = [
    verifyJWT,
    body('title')
      .isString()
      .withMessage('No es un título válido')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El título debe tener al menos 3 caracteres'),
    body('category_id', 'No es un id de MongoDB válido')
      .isMongoId()
      .bail()
      .custom(isValidCategory)
      .bail()
      .customSanitizer((value) => new ObjectId(value))
      .optional({
        nullable: true,
      }),
    body('expirationAt', 'La fecha de expiración no es válida')
      .isISO8601()
      .bail()
      .toDate(),
    body('subtasks', 'Se esperaba un arreglo de subtareas')
      .isArray()
      .optional({ nullable: true }),
    body('subtasks.*.title', 'Título es requerido')
      .if(body('subtasks').exists())
      .isString()
      .withMessage('No es un título (subtarea) válido')
      .bail()
      .isLength({ min: 3 })
      .withMessage('El título (subtarea) debe tener al menos 3 caracteres'),
    body('subtasks.*.completed', 'El estado de completado no es válido')
      .isBoolean()
      .optional({ nullable: true }),
    body('subtasks')
      .if(body('subtasks').isArray())
      .bail()
      .customSanitizer(buildSubtasks)
      .optional({
        nullable: true,
      }),
    body('notes', 'La nota no es válida')
      .isString()
      .optional({ nullable: true }),
    validateFields,
  ];

  public static validateGetTasksByUserId = [verifyJWT];
  public static validateCreateTask = this.validateBody;
  public static validateUpdateTask = [
    ...this.validateParams,
    ...arrayWithoutFirstElement(this.validateBody),
  ];
  public static validateDeleteTask = this.validateParams;
  public static validateToggleTask = this.validateParams;
}
