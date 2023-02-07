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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const helpers_1 = require("../helpers");
const mongodb_1 = require("mongodb");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            message: 'x-token no proveído en la cabecera de la petición.',
        });
    }
    else {
        try {
            const payload = jsonwebtoken_1.default.verify(token, (0, helpers_1.getSecretKey)());
            const { _id, name } = payload;
            const user = yield services_1.UserService.getUserByIdFromDb(new mongodb_1.ObjectId(_id));
            if (!user) {
                res.status(401).json({
                    message: 'Token no válido.',
                });
            }
            else {
                req.headers['x-user'] = JSON.stringify({ _id, name });
                next();
            }
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no válido.',
            });
        }
    }
});
exports.verifyJWT = verifyJWT;
