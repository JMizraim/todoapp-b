import { ObjectId } from 'mongodb';
import { Category } from './category';
import { Subtask } from './subtask';

export class Task {
  constructor(
    public user_id: ObjectId,
    public title: string,
    public expirationAt: Date,
    public category_id?: ObjectId,
    // public category?: Category,
    public subtasks?: Subtask[],
    public notes?: string,
    public completedAt?: Date,
    public completed?: boolean,
    public _id?: ObjectId
  ) {
    if (completedAt) {
      this.completed = true;
    } else {
      this.completed = false;
    }
  }
}
