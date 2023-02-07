"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(user_id, title, expirationAt, category_id, 
    // public category?: Category,
    subtasks, notes, completedAt, completed, _id) {
        this.user_id = user_id;
        this.title = title;
        this.expirationAt = expirationAt;
        this.category_id = category_id;
        this.subtasks = subtasks;
        this.notes = notes;
        this.completedAt = completedAt;
        this.completed = completed;
        this._id = _id;
        if (completedAt) {
            this.completed = true;
        }
        else {
            this.completed = false;
        }
    }
}
exports.Task = Task;
