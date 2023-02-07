import { UserService, TaskService, CategoryService } from '../services';
import { CustomValidator } from 'express-validator';
import { ObjectId } from 'mongodb';
import { UserJwtPayload } from '../interfaces';

export const isNotEmailInUse: CustomValidator = async (
  email: string,
  { req }
): Promise<boolean> => {
  const { _id }: UserJwtPayload = JSON.parse(
    (req.header('x-user') as string | undefined) || '{"_id":"", "name":""}'
  );
  try {
    const user = await UserService.getUserByEmailFromDb(email);
    if (user && user._id.toString() !== _id) {
      throw new Error(
        'Lo sentimos, el correo electrónico ya se encuentra en uso'
      );
    }
    return true;
  } catch (err) {
    throw err;
  }
};

export const isValidTask: CustomValidator = async (
  id: string | ObjectId,
  { req }
): Promise<boolean> => {
  const { _id } = JSON.parse(req.header('x-user') as string);
  try {
    const task = await TaskService.getTaskByIdFromDb(
      id instanceof ObjectId ? id : new ObjectId(id)
    );
    if (!task) {
      throw new Error(`La tarea con id ${id} no existe en la base de datos`);
    }
    if (task?.user_id.toString() !== _id) {
      throw new Error(`La tarea con id ${id} no pertenece al usuario`);
    }
    return true;
  } catch (err) {
    throw err;
  }
};

export const isValidCategory: CustomValidator = async (
  id: string,
  { req }
): Promise<boolean> => {
  const { _id: user_id }: UserJwtPayload = JSON.parse(
    req.header('x-user') as string
  );
  try {
    const category = await CategoryService.getCategoryByIdFromDb(
      new ObjectId(id)
    );
    if (!category) {
      throw new Error(
        `La categoría con id ${id} no existe en la base de datos`
      );
    }
    if (category.user_id.toString() !== user_id) {
      throw new Error(`La categoría con id ${id} no pertenece al usuario`);
    }
    return true;
  } catch (err) {
    throw err;
  }
};
