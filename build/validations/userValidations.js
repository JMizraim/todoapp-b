"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const _1 = require("./");
class UserValidations {
    constructor() { }
}
exports.UserValidations = UserValidations;
_a = UserValidations;
UserValidations.validateBody = [
    middlewares_1.verifyJWT,
    (0, express_validator_1.body)('name')
        .isString()
        .withMessage('El nombre no es válido')
        .bail()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('No es un correo electrónico válido')
        .bail()
        .custom(_1.isNotEmailInUse),
    (0, express_validator_1.body)('password')
        .isString()
        .withMessage('La contraseña no es válida')
        .bail()
        .isLength({ min: 4 })
        .withMessage('La contraseña debe tener al menos 4 caracteres'),
    middlewares_1.validateFields,
];
UserValidations.validateCreateUser = (0, helpers_1.arrayWithoutFirstElement)(_a.validateBody);
UserValidations.validateUpdateUser = _a.validateBody;
UserValidations.validateDeleteUser = [middlewares_1.verifyJWT];
