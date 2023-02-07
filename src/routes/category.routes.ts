import { Router } from 'express';
import { CategoryController } from '../controllers';
import { MyRouter } from '../interfaces';
import { CategoryValidations } from '../validations';

export class CategoryRoutes implements MyRouter {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.init();
  }

  get path(): string {
    return '/api/category';
  }
  get router(): Router {
    return this._router;
  }

  private init(): void {
    this._router.get(
      '/',
      CategoryValidations.validateGetCategoriesByUserId,
      CategoryController.getCategoriesByUserId
    );
    this._router.post(
      '/',
      CategoryValidations.validateCreateCategory,
      CategoryController.createCategory
    );
    this._router.put(
      '/:id',
      CategoryValidations.validateUpdateCategory,
      CategoryController.updateCategory
    );
    this.router.delete(
      '/:id',
      CategoryValidations.validateDeleteCategory,
      CategoryController.deleteCategory
    );
  }
}
