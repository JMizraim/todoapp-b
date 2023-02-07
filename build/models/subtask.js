"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subtask = void 0;
class Subtask {
    constructor(title, completed, _id) {
        this.title = title;
        this.completed = completed;
        this._id = _id;
        if (!this.completed) {
            this.completed = false;
        }
    }
}
exports.Subtask = Subtask;
