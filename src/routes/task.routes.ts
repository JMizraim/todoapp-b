import { MyRouter } from '../interfaces';
import { Router } from 'express';
import { TaskController } from '../controllers';
import { TaskValidations } from '../validations';

export class TaskRoutes implements MyRouter {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  get path(): string {
    return '/api/task';
  }

  get router(): Router {
    return this._router;
  }

  private init = (): void => {
    this._router.get(
      '/',
      TaskValidations.validateGetTasksByUserId,
      TaskController.getTasksByUserId
    );

    this._router.post(
      '/',
      TaskValidations.validateCreateTask,
      TaskController.createTask
    );
    this._router.put(
      '/:id',
      TaskValidations.validateUpdateTask,
      TaskController.updateTask
    );
    this._router.put(
      '/:id/toggle',
      TaskValidations.validateToggleTask,
      TaskController.toggleTask
    );
    this._router.delete(
      '/:id',
      TaskValidations.validateDeleteTask,
      TaskController.deleteTaskById
    );
  };
}
