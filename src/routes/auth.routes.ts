import { Router } from 'express';
import { AuthController } from '../controllers';
import { MyRouter } from '../interfaces';
import { AuthValidations, UserValidations } from '../validations';

export class AuthRoutes implements MyRouter {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  get path(): string {
    return '/api/auth';
  }
  get router(): Router {
    return this._router;
  }
  private init(): void {
    this._router.post(
      '/login',
      AuthValidations.validateLogin,
      AuthController.login
    );
    this._router.post(
      '/register',
      UserValidations.validateCreateUser,
      AuthController.register
    );
    this._router.get(
      '/renewToken',
      AuthValidations.validateRenewToken,
      AuthController.renewToken
    );
  }
}
