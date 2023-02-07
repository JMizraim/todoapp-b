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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCategory = exports.isValidTask = exports.isNotEmailInUse = void 0;
const services_1 = require("../services");
const mongodb_1 = require("mongodb");
const isNotEmailInUse = (email, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = JSON.parse(req.header('x-user') || '{"_id":"", "name":""}');
    try {
        const user = yield services_1.UserService.getUserByEmailFromDb(email);
        if (user && user._id.toString() !== _id) {
            throw new Error('Lo sentimos, el correo electrónico ya se encuentra en uso');
        }
        return true;
    }
    catch (err) {
        throw err;
    }
});
exports.isNotEmailInUse = isNotEmailInUse;
const isValidTask = (id, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = JSON.parse(req.header('x-user'));
    try {
        const task = yield services_1.TaskService.getTaskByIdFromDb(id instanceof mongodb_1.ObjectId ? id : new mongodb_1.ObjectId(id));
        if (!task) {
            throw new Error(`La tarea con id ${id} no existe en la base de datos`);
        }
        if ((task === null || task === void 0 ? void 0 : task.user_id.toString()) !== _id) {
            throw new Error(`La tarea con id ${id} no pertenece al usuario`);
        }
        return true;
    }
    catch (err) {
        throw err;
    }
});
exports.isValidTask = isValidTask;
const isValidCategory = (id, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: user_id } = JSON.parse(req.header('x-user'));
    try {
        const category = yield services_1.CategoryService.getCategoryByIdFromDb(new mongodb_1.ObjectId(id));
        if (!category) {
            throw new Error(`La categoría con id ${id} no existe en la base de datos`);
        }
        if (category.user_id.toString() !== user_id) {
            throw new Error(`La categoría con id ${id} no pertenece al usuario`);
        }
        return true;
    }
    catch (err) {
        throw err;
    }
});
exports.isValidCategory = isValidCategory;
