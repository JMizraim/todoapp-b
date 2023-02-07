import { ObjectId } from 'mongodb';

export class Subtask {
  constructor(
    public title: string,
    public completed?: boolean,
    public _id?: ObjectId
  ) {
    if (!this.completed) {
      this.completed = false;
    }
  }
}
