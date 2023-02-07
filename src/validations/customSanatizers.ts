import { CustomSanitizer } from 'express-validator';
import { ObjectId } from 'mongodb';
import { Subtask } from '../models';

export const buildSubtasks: CustomSanitizer = (subtasks: any[]) => {
  const builtSubtasks: Subtask[] = subtasks.map((subtask) => {
    return new Subtask(
      subtask.title,
      subtask.completed ?? false,
      subtask._id ?? new ObjectId()
    );
  });
  return builtSubtasks;
};
