import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { TypedRequestBody, UserJwtPayload } from '../interfaces';
import { TaskService } from '../services';
import { Task } from '../models';

export class TaskController {
  private constructor() {}

  static async getTasksByUserId(req: Request, res: Response) {
    const { _id: user_id }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    );
    try {
      const tasks = await TaskService.getTasksByUserIdFromDb(
        new ObjectId(user_id)
      );
      res.status(200).json({
        tasks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'No se pudo crear la tarea. Error interno del Servidor.',
      });
    }
  }

  static async createTask(req: TypedRequestBody<Task>, res: Response) {
    const { title, expirationAt, subtasks, category_id, notes } = req.body;
    const { _id: user_id }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    ); //Estoy seguro de que viene el x-user porque el middleware verifyJWT lo valida

    const newTask = new Task(
      new ObjectId(user_id),
      title,
      expirationAt,
      category_id,
      subtasks,
      notes
    );

    try {
      const id_task = await TaskService.createTaskInDb(newTask);
      res.status(201).json({
        message: '¡La tarea ha sido creada correctamente!',
        id_task,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo crear la tarea. Error interno del Servidor.',
      });
    }
  }

  static async updateTask(
    req: Request<{ id: string }, any, Task>,
    res: Response
  ) {
    const task_id = new ObjectId(req.params.id);
    const { _id: user_id }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    );

    const { title, expirationAt, category_id, subtasks, notes, completedAt } =
      req.body;

    // Necesito instanciar la clase Task para obtener si la tarea está completada o no
    const task = new Task(
      new ObjectId(user_id),
      title,
      expirationAt,
      category_id,
      subtasks,
      notes,
      completedAt
    );

    try {
      const modifiedCount = await TaskService.updateTaskIndDb(task_id, task);
      res.status(201).json({
        message: '¡La tarea ha sido actualizada correctamente!',
        modifiedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo actualizar la tarea. Error interno del Servidor.',
      });
    }
  }

  static async deleteTaskById(req: Request<{ id: string }>, res: Response) {
    try {
      const deletedCount = await TaskService.deleteTaskByIdInDb(
        new ObjectId(req.params.id)
      );
      res.json({
        message: '¡La tarea ha sido eliminada correctamente!',
        deletedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo eliminar la tarea. Error interno del Servidor.',
      });
    }
  }

  static async toggleTask(req: Request<{ id: string }>, res: Response) {
    try {
      const modifiedCount = await TaskService.toggleTaskInDb(
        new ObjectId(req.params.id)
      );
      res.json({
        message: '¡El estado de la tarea ha sido cambiado correctamente!',
        modifiedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'No se pudo actualizar el estado de completado de la tarea. Error interno del Servidor.',
      });
    }
  }
}
