"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
class TaskRoutes {
    constructor() {
        this.init = () => {
            this._router.get('/', validations_1.TaskValidations.validateGetTasksByUserId, controllers_1.TaskController.getTasksByUserId);
            this._router.post('/', validations_1.TaskValidations.validateCreateTask, controllers_1.TaskController.createTask);
            this._router.put('/:id', validations_1.TaskValidations.validateUpdateTask, controllers_1.TaskController.updateTask);
            this._router.put('/:id/toggle', validations_1.TaskValidations.validateToggleTask, controllers_1.TaskController.toggleTask);
            this._router.delete('/:id', validations_1.TaskValidations.validateDeleteTask, controllers_1.TaskController.deleteTaskById);
        };
        this._router = (0, express_1.Router)();
        this.init();
    }
    get path() {
        return '/api/task';
    }
    get router() {
        return this._router;
    }
}
exports.TaskRoutes = TaskRoutes;
