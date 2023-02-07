import { CategoryService } from '../services';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { TypedRequestBody, UserJwtPayload } from '../interfaces';
import { Category } from '../models';

export class CategoryController {
  private constructor() {}

  public static async getCategoriesByUserId(req: Request, res: Response) {
    const { _id }: UserJwtPayload = JSON.parse(req.header('x-user') as string);
    try {
      const categories = await CategoryService.getCategoriesByUserIdFromDb(
        new ObjectId(_id)
      );
      res.status(200).json({
        categories,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, error al obtener categorías. Error interno del Servidor',
      });
    }
  }

  public static async createCategory(
    req: TypedRequestBody<Category>,
    res: Response
  ) {
    const { _id: user_id }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    );
    const { name } = req.body;
    try {
      const categoryCreated = await CategoryService.createCategoryInDb({
        name,
        user_id: new ObjectId(user_id),
      });
      res.json({
        message: '¡La categoría se ha creado correctamente!',
        categoryCreated,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo crear la categoría. Error interno del Servidor',
      });
    }
  }

  public static async updateCategory(
    req: Request<{ id: string }, any, Category>,
    res: Response
  ) {
    const { name } = req.body;
    const _id = new ObjectId(req.params.id);

    try {
      const category = await CategoryService.updateCategoryInDb(_id, name);
      res.json({
        message: 'La categoría se ha actualizado correctamente!',
        category,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo actualizar la categoría. Error interno del Servidor',
      });
    }
  }

  public static async deleteCategory(
    req: Request<{ id: string }>,
    res: Response
  ) {
    const _id = new ObjectId(req.params.id);
    try {
      const deletedCount = await CategoryService.deleteCategoryInDb(_id);
      res.status(200).json({
        message: '¡La categoría se ha eliminado correctamente!',
        deletedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo eliminar la categoría. Error interno del Servidor',
      });
    }
  }
}
