"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSubtasks = void 0;
const mongodb_1 = require("mongodb");
const models_1 = require("../models");
const buildSubtasks = (subtasks) => {
    const builtSubtasks = subtasks.map((subtask) => {
        var _a, _b;
        return new models_1.Subtask(subtask.title, (_a = subtask.completed) !== null && _a !== void 0 ? _a : false, (_b = subtask._id) !== null && _b !== void 0 ? _b : new mongodb_1.ObjectId());
    });
    return builtSubtasks;
};
exports.buildSubtasks = buildSubtasks;
