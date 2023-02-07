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
exports.TaskController = void 0;
const mongodb_1 = require("mongodb");
const services_1 = require("../services");
const models_1 = require("../models");
class TaskController {
    constructor() { }
    static getTasksByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id: user_id } = JSON.parse(req.header('x-user'));
            try {
                const tasks = yield services_1.TaskService.getTasksByUserIdFromDb(new mongodb_1.ObjectId(user_id));
                res.status(200).json({
                    tasks,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'No se pudo crear la tarea. Error interno del Servidor.',
                });
            }
        });
    }
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, expirationAt, subtasks, category_id, notes } = req.body;
            const { _id: user_id } = JSON.parse(req.header('x-user')); //Estoy seguro de que viene el x-user porque el middleware verifyJWT lo valida
            const newTask = new models_1.Task(new mongodb_1.ObjectId(user_id), title, expirationAt, category_id, subtasks, notes);
            try {
                const id_task = yield services_1.TaskService.createTaskInDb(newTask);
                res.status(201).json({
                    message: '¡La tarea ha sido creada correctamente!',
                    id_task,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo crear la tarea. Error interno del Servidor.',
                });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const task_id = new mongodb_1.ObjectId(req.params.id);
            const { _id: user_id } = JSON.parse(req.header('x-user'));
            const { title, expirationAt, category_id, subtasks, notes, completedAt } = req.body;
            // Necesito instanciar la clase Task para obtener si la tarea está completada o no
            const task = new models_1.Task(new mongodb_1.ObjectId(user_id), title, expirationAt, category_id, subtasks, notes, completedAt);
            try {
                const modifiedCount = yield services_1.TaskService.updateTaskIndDb(task_id, task);
                res.status(201).json({
                    message: '¡La tarea ha sido actualizada correctamente!',
                    modifiedCount,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo actualizar la tarea. Error interno del Servidor.',
                });
            }
        });
    }
    static deleteTaskById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield services_1.TaskService.deleteTaskByIdInDb(new mongodb_1.ObjectId(req.params.id));
                res.json({
                    message: '¡La tarea ha sido eliminada correctamente!',
                    deletedCount,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Lo sentimos, no se pudo eliminar la tarea. Error interno del Servidor.',
                });
            }
        });
    }
    static toggleTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modifiedCount = yield services_1.TaskService.toggleTaskInDb(new mongodb_1.ObjectId(req.params.id));
                res.json({
                    message: '¡El estado de la tarea ha sido cambiado correctamente!',
                    modifiedCount,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'No se pudo actualizar el estado de completado de la tarea. Error interno del Servidor.',
                });
            }
        });
    }
}
exports.TaskController = TaskController;
