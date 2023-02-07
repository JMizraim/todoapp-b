import { Database } from './database';
import { Task } from '../models';
import { Collection, ObjectId, Document } from 'mongodb';

export class TaskService {
  private static db: Database = Database.instance;
  private static taskCollection: Collection<Task> =
    this.db.useCollection<Task>('tasks');

  private constructor() {}

  //Pipeline para obtener las tareas de un usuario con su categoría
  private static getPipeline = ($match: Document) => {
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

  public static async getTasksByUserIdFromDb(user_id: ObjectId) {
    try {
      const result = this.taskCollection.aggregate(
        this.getPipeline({ user_id })
      );
      const tasks: Document[] = [];
      await result.forEach((task) => {
        tasks.push(task);
      });
      return tasks;
    } catch (err) {
      throw err;
    }
  }

  public static async createTaskInDb(task: Task) {
    try {
      const insertResult = await this.taskCollection.insertOne(task);
      return insertResult.insertedId;
    } catch (err) {
      throw err;
    }
  }

  public static async updateTaskIndDb(
    _id: ObjectId,
    { _id: ignore, ...rest }: Task
  ) {
    try {
      const result = await this.taskCollection.replaceOne({ _id }, { ...rest });
      return result.modifiedCount;
    } catch (err) {
      throw err;
    }
  }

  public static async getTaskByIdFromDb(_id: ObjectId) {
    try {
      const task = await this.taskCollection.findOne({ _id });
      return task;
    } catch (err) {
      throw err;
    }
  }

  public static async deleteTaskByIdInDb(_id: ObjectId) {
    try {
      const result = await this.taskCollection.deleteOne({ _id });
      return result.deletedCount;
    } catch (err) {
      throw err;
    }
  }

  public static async toggleTaskInDb(_id: ObjectId) {
    try {
      const result = await this.taskCollection.updateOne({ _id }, [
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
    } catch (err) {
      throw err;
    }
  }
}
