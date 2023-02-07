import { AuthenticationError, UserJwtPayload } from '../interfaces';
import { Request, Response } from 'express';
import { TypedRequestBody } from '../interfaces';
import { UserService } from '../services';
import bycript from 'bcrypt';
import { User } from '../models';

export class AuthController {
  public static async login(
    req: TypedRequestBody<{ email: string; password: string }>,
    res: Response
  ) {
    const { email, password } = req.body;
    try {
      const user = await UserService.getUserByEmailFromDb(email);

      if (!user) {
        throw new AuthenticationError(
          'Usuario o contraseña inválidos. Por favor, inténtalo de nuevo.'
        );
      }
      const isEqual: boolean = await bycript.compare(password, user.password);
      if (!isEqual) {
        throw new AuthenticationError(
          'Usuario o contraseña inválidos. Por favor, inténtalo de nuevo.'
        );
      }
      const token = await UserService.getJWT(user._id.toString(), user.name);
      res.status(200).json({
        user: {
          ...user,
          password: undefined,
        },
        token,
      });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        console.error(err);
        res.status(500).json({
          message: 'Error en la autenticación. Error interno del Servidor.',
        });
      }
    }
  }

  public static async register(req: TypedRequestBody<User>, res: Response) {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bycript.hash(password, 12);
      const user = await UserService.createUserInDb({
        name,
        email,
        password: hashedPassword,
      });
      const token = await UserService.getJWT(user._id.toString(), user.name);
      res.json({
        user: {
          ...user,
          password: undefined,
        },
        token,
      });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        console.error(err);
        res.status(400).json({
          message:
            'Lo sentimos, error en el registro. Error interno del Servidor.',
        });
      }
    }
  }

  public static async renewToken(req: Request, res: Response) {
    const { _id, name }: UserJwtPayload = JSON.parse(
      req.header('x-user') as string
    );
    try {
      const token = await UserService.getJWT(_id, name);
      res.status(200).json({
        user: {
          _id,
          name,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  }
}
