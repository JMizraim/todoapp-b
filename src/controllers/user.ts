import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '../models';
import { UserService } from '../services';
import bycript from 'bcrypt';
import { TypedRequestBody, UserJwtPayload } from '../interfaces';

export class UserController {
  private constructor() {}

  static async updateUser(req: TypedRequestBody<User>, res: Response) {
    const { _id: user_id }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    );
    const { name, email, password } = req.body;

    const hashedPassword = await bycript.hash(password, 10);

    try {
      const user = await UserService.updateUserInDb(new ObjectId(user_id), {
        name,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        message: '¡El usuario se ha actualizado correctamente!',
        user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo actualizar el usuario. Error interno del Servidor.',
      });
    }
  }

  // TODO: implementar trigger para borrar todos las categorías y tareas asociadas al usuario
  static async deleteUser(req: Request, res: Response) {
    const { _id }: UserJwtPayload = JSON.parse(req.header('x-user') as string);
    try {
      const deletedCount = await UserService.deleteUserInDb(new ObjectId(_id));
      res.status(200).json({
        message: '¡El usuario se ha eliminado correctamente!',
        deletedCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message:
          'Lo sentimos, no se pudo eliminar el usuario. Error interno del Servidor.',
      });
    }
  }
}
