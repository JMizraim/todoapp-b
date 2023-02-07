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
exports.AuthController = void 0;
const interfaces_1 = require("../interfaces");
const services_1 = require("../services");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield services_1.UserService.getUserByEmailFromDb(email);
                if (!user) {
                    throw new interfaces_1.AuthenticationError('Usuario o contraseña inválidos. Por favor, inténtalo de nuevo.');
                }
                const isEqual = yield bcrypt_1.default.compare(password, user.password);
                if (!isEqual) {
                    throw new interfaces_1.AuthenticationError('Usuario o contraseña inválidos. Por favor, inténtalo de nuevo.');
                }
                const token = yield services_1.UserService.getJWT(user._id.toString(), user.name);
                res.status(200).json({
                    user: Object.assign(Object.assign({}, user), { password: undefined }),
                    token,
                });
            }
            catch (err) {
                if (err instanceof interfaces_1.AuthenticationError) {
                    res.status(400).json({
                        message: err.message,
                    });
                }
                else {
                    console.error(err);
                    res.status(500).json({
                        message: 'Error en la autenticación. Error interno del Servidor.',
                    });
                }
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                const user = yield services_1.UserService.createUserInDb({
                    name,
                    email,
                    password: hashedPassword,
                });
                const token = yield services_1.UserService.getJWT(user._id.toString(), user.name);
                res.json({
                    user: Object.assign(Object.assign({}, user), { password: undefined }),
                    token,
                });
            }
            catch (err) {
                if (err instanceof interfaces_1.AuthenticationError) {
                    res.status(400).json({
                        message: err.message,
                    });
                }
                else {
                    console.error(err);
                    res.status(400).json({
                        message: 'Lo sentimos, error en el registro. Error interno del Servidor.',
                    });
                }
            }
        });
    }
    static renewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, name } = JSON.parse(req.header('x-user'));
            try {
                const token = yield services_1.UserService.getJWT(_id, name);
                res.status(200).json({
                    user: {
                        _id,
                        name,
                    },
                    token,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({
                    message: err,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
