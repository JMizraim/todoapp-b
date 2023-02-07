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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const database_1 = require("./database");
class TaskService {
    constructor() { }
    static getTasksByUserIdFromDb(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.taskCollection.aggregate(this.getPipeline({ user_id }));
                const tasks = [];
                yield result.forEach((task) => {
                    tasks.push(task);
                });
                return tasks;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static createTaskInDb(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertResult = yield this.taskCollection.insertOne(task);
                return insertResult.insertedId;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateTaskIndDb(_id, _b) {
        var { _id: ignore } = _b, rest = __rest(_b, ["_id"]);
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskCollection.replaceOne({ _id }, Object.assign({}, rest));
                return result.modifiedCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getTaskByIdFromDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskCollection.findOne({ _id });
                return task;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteTaskByIdInDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskCollection.deleteOne({ _id });
                return result.deletedCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static toggleTaskInDb(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskCollection.updateOne({ _id }, [
                    {
                        $set: {
                            completedAt: {
                                $cond: {
                                    if: {
                                        $eq: ['$completed', false],
                                    },
                                    then: new Date(),
                                    else: undefined,
                                },
                            },
                            completed: { $not: '$completed' },
                        },
                    },
                ]);
                return result.modifiedCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TaskService = TaskService;
_a = TaskService;
TaskService.db = database_1.Database.instance;
TaskService.taskCollection = _a.db.useCollection('tasks');
//Pipeline para obtener las tareas de un usuario con su categoría
TaskService.getPipeline = ($match) => {
    return [
        {
            $match,
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $project: {
                category_id: 0,
                'category.user_id': 0,
            },
        },
    ];
};
