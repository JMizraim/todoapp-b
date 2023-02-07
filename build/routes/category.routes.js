"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
class CategoryRoutes {
    constructor() {
        this._router = (0, express_1.Router)();
        this.init();
    }
    get path() {
        return '/api/category';
    }
    get router() {
        return this._router;
    }
    init() {
        this._router.get('/', validations_1.CategoryValidations.validateGetCategoriesByUserId, controllers_1.CategoryController.getCategoriesByUserId);
        this._router.post('/', validations_1.CategoryValidations.validateCreateCategory, controllers_1.CategoryController.createCategory);
        this._router.put('/:id', validations_1.CategoryValidations.validateUpdateCategory, controllers_1.CategoryController.updateCategory);
        this.router.delete('/:id', validations_1.CategoryValidations.validateDeleteCategory, controllers_1.CategoryController.deleteCategory);
    }
}
exports.CategoryRoutes = CategoryRoutes;
