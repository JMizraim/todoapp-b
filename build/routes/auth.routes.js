"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
class AuthRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.init();
    }
    get path() {
        return '/api/auth';
    }
    get router() {
        return this._router;
    }
    init() {
        this._router.post('/login', validations_1.AuthValidations.validateLogin, controllers_1.AuthController.login);
        this._router.post('/register', validations_1.UserValidations.validateCreateUser, controllers_1.AuthController.register);
        this._router.get('/renewToken', validations_1.AuthValidations.validateRenewToken, controllers_1.AuthController.renewToken);
    }
}
exports.AuthRoutes = AuthRoutes;
