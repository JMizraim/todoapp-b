"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const customValidations_1 = require("./customValidations");
const middlewares_1 = require("../middlewares");
class CategoryValidations {
}
exports.CategoryValidations = CategoryValidations;
_a = CategoryValidations;
CategoryValidations.validateParams = [
    middlewares_1.verifyJWT,
    (0, express_validator_1.param)('id', 'No es un id de MongoDB válido')
        .isMongoId()
        .bail()
        .custom(customValidations_1.isValidCategory),
    middlewares_1.validateFields,
];
CategoryValidations.validateBody = [
    middlewares_1.verifyJWT,
    (0, express_validator_1.body)('name')
        .isString()
        .withMessage('El nombre no es válido')
        .bail()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    middlewares_1.validateFields,
];
CategoryValidations.validateGetCategoriesByUserId = [middlewares_1.verifyJWT];
CategoryValidations.validateCreateCategory = _a.validateBody;
CategoryValidations.validateUpdateCategory = [
    ..._a.validateParams,
    ...(0, helpers_1.arrayWithoutFirstElement)(_a.validateBody),
];
CategoryValidations.validateDeleteCategory = _a.validateParams;
