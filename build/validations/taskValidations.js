"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidations = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const customSanatizers_1 = require("./customSanatizers");
const customValidations_1 = require("./customValidations");
class TaskValidations {
    constructor() { }
}
exports.TaskValidations = TaskValidations;
_a = TaskValidations;
TaskValidations.validateParams = [
    middlewares_1.verifyJWT,
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('No es un id de MongoDB válido')
        .bail()
        .custom(customValidations_1.isValidTask),
    middlewares_1.validateFields,
];
TaskValidations.validateBody = [
    middlewares_1.verifyJWT,
    (0, express_validator_1.body)('title')
        .isString()
        .withMessage('No es un título válido')
        .bail()
        .isLength({ min: 3 })
        .withMessage('El título debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('category_id', 'No es un id de MongoDB válido')
        .isMongoId()
        .bail()
        .custom(customValidations_1.isValidCategory)
        .bail()
        .customSanitizer((value) => new mongodb_1.ObjectId(value))
        .optional({
        nullable: true,
    }),
    (0, express_validator_1.body)('expirationAt', 'La fecha de expiración no es válida')
        .isISO8601()
        .bail()
        .toDate(),
    (0, express_validator_1.body)('subtasks', 'Se esperaba un arreglo de subtareas')
        .isArray()
        .optional({ nullable: true }),
    (0, express_validator_1.body)('subtasks.*.title', 'Título es requerido')
        .if((0, express_validator_1.body)('subtasks').exists())
        .isString()
        .withMessage('No es un título (subtarea) válido')
        .bail()
        .isLength({ min: 3 })
        .withMessage('El título (subtarea) debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('subtasks.*.completed', 'El estado de completado no es válido')
        .isBoolean()
        .optional({ nullable: true }),
    (0, express_validator_1.body)('subtasks')
        .if((0, express_validator_1.body)('subtasks').isArray())
        .bail()
        .customSanitizer(customSanatizers_1.buildSubtasks)
        .optional({
        nullable: true,
    }),
    (0, express_validator_1.body)('notes', 'La nota no es válida')
        .isString()
        .optional({ nullable: true }),
    middlewares_1.validateFields,
];
TaskValidations.validateGetTasksByUserId = [middlewares_1.verifyJWT];
TaskValidations.validateCreateTask = _a.validateBody;
TaskValidations.validateUpdateTask = [
    ..._a.validateParams,
    ...(0, helpers_1.arrayWithoutFirstElement)(_a.validateBody),
];
TaskValidations.validateDeleteTask = _a.validateParams;
TaskValidations.validateToggleTask = _a.validateParams;
