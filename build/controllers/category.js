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
exports.CategoryController = void 0;
const services_1 = require("../services");
const mongodb_1 = require("mongodb");
class CategoryController {
    constructor() { }
    static getCategoriesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = JSON.parse(req.header('x-user'));
            try {
                const categories = yield services_1.CategoryService.getCategoriesByUserIdFromDb(new mongodb_1.ObjectId(_id));
                res.status(200).json({
                    categories,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, error al obtener categorías. Error interno del Servidor',
                });
            }
        });
    }
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id: user_id } = JSON.parse(req.header('x-user'));
            const { name } = req.body;
            try {
                const categoryCreated = yield services_1.CategoryService.createCategoryInDb({
                    name,
                    user_id: new mongodb_1.ObjectId(user_id),
                });
                res.json({
                    message: '¡La categoría se ha creado correctamente!',
                    categoryCreated,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo crear la categoría. Error interno del Servidor',
                });
            }
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const _id = new mongodb_1.ObjectId(req.params.id);
            try {
                const category = yield services_1.CategoryService.updateCategoryInDb(_id, name);
                res.json({
                    message: 'La categoría se ha actualizado correctamente!',
                    category,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo actualizar la categoría. Error interno del Servidor',
                });
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongodb_1.ObjectId(req.params.id);
            try {
                const deletedCount = yield services_1.CategoryService.deleteCategoryInDb(_id);
                res.status(200).json({
                    message: '¡La categoría se ha eliminado correctamente!',
                    deletedCount,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo eliminar la categoría. Error interno del Servidor',
                });
            }
        });
    }
}
exports.CategoryController = CategoryController;
