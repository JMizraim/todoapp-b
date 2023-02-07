"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
class UserRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.init();
    }
    get path() {
        return '/api/user';
    }
    get router() {
        return this._router;
    }
    init() {
        // Para el update y delete, se usa el mismo middleware de validación para obtener el id del usuario
        this._router.put('/', validations_1.UserValidations.validateUpdateUser, controllers_1.UserController.updateUser);
        this._router.delete('/', validations_1.UserValidations.validateDeleteUser, controllers_1.UserController.deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
