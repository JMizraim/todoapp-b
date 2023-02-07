import { Router } from 'express';
import { MyRouter } from '../interfaces';
import { UserController } from '../controllers';
import { UserValidations } from '../validations';

export class UserRoutes implements MyRouter {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  get path(): string {
    return '/api/user';
  }
  get router(): Router {
    return this._router;
  }

  private init(): void {
    // Para el update y delete, se usa el mismo middleware de validación para obtener el id del usuario
    this._router.put(
      '/',
      UserValidations.validateUpdateUser,
      UserController.updateUser
    );
    this._router.delete(
      '/',
      UserValidations.validateDeleteUser,
      UserController.deleteUser
    );
  }
}
