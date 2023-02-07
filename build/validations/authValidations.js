"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
class AuthValidations {
    constructor() { }
}
exports.AuthValidations = AuthValidations;
_a = AuthValidations;
AuthValidations.validateBody = [
    (0, express_validator_1.body)('email').isEmail().withMessage('El correo electrónico no es válido.'),
    (0, express_validator_1.body)('password')
        .isString()
        .withMessage('El valor de la contraseña no es válida.')
        .bail()
        .isLength({ min: 3 })
        .withMessage('La contraseña es requerida.'),
    middlewares_1.validateFields,
];
AuthValidations.validateLogin = _a.validateBody;
AuthValidations.validateRegisterBody = [
    (0, express_validator_1.body)('name')
        .isString()
        .withMessage('El nombre no es válido.')
        .bail()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres.'),
    ..._a.validateBody,
];
AuthValidations.validateRenewToken = [middlewares_1.verifyJWT];
