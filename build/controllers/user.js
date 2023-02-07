"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongodb_1 = require("mongodb");
const services_1 = require("../services");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor() { }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id: user_id } = JSON.parse(req.header('x-user'));
            const { name, email, password } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            try {
                const user = yield services_1.UserService.updateUserInDb(new mongodb_1.ObjectId(user_id), {
                    name,
                    email,
                    password: hashedPassword,
                });
                res.status(200).json({
                    message: '¡El usuario se ha actualizado correctamente!',
                    user,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo actualizar el usuario. Error interno del Servidor.',
                });
            }
        });
    }
    // TODO: implementar trigger para borrar todos las categorías y tareas asociadas al usuario
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = JSON.parse(req.header('x-user'));
            try {
                const deletedCount = yield services_1.UserService.deleteUserInDb(new mongodb_1.ObjectId(_id));
                res.status(200).json({
                    message: '¡El usuario se ha eliminado correctamente!',
                    deletedCount,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo eliminar el usuario. Error interno del Servidor.',
                });
            }
        });
    }
}
exports.UserController = UserController;
