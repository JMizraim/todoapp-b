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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("./database");
const helpers_1 = require("../helpers");
const interfaces_1 = require("../interfaces");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() { }
    static getUserByIdFromDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userCollection.findOne({ _id });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getUserByEmailFromDb(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userCollection.findOne({ email });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static createUserInDb(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userCollection.insertOne(user);
                const userCreated = yield this.userCollection.findOne({
                    _id: new mongodb_1.ObjectId(result.insertedId),
                });
                if (!userCreated)
                    throw new interfaces_1.AuthenticationError('Error al obtener el usuario creado');
                return userCreated;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateUserInDb(_id, _b) {
        var { _id: ignore } = _b, rest = __rest(_b, ["_id"]);
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdated = yield this.userCollection.findOneAndReplace({ _id }, Object.assign({}, rest), {
                    returnDocument: 'after',
                });
                return userUpdated.value;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteUserInDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userCollection.deleteOne({ _id });
                return result.deletedCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserService = UserService;
_a = UserService;
UserService.db = database_1.Database.instance;
UserService.userCollection = _a.db.useCollection('users');
UserService.getJWT = (_id, name) => {
    const payload = { _id, name };
    return new Promise((resolve, reject) => {
        const secretKey = (0, helpers_1.getSecretKey)();
        jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
