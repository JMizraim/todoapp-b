import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../interfaces';
import { UserService } from '../services';
import { getSecretKey } from '../helpers';
import { ObjectId } from 'mongodb';

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');
  if (!token) {
    res.status(401).json({
      message: 'x-token no proveído en la cabecera de la petición.',
    });
  } else {
    try {
      const payload = jwt.verify(token, getSecretKey()) as UserJwtPayload;
      const { _id, name } = payload;
      const user = await UserService.getUserByIdFromDb(new ObjectId(_id));
      if (!user) {
        res.status(401).json({
          message: 'Token no válido.',
        });
      } else {
        req.headers['x-user'] = JSON.stringify({ _id, name });
        next();
      }
    } catch (error) {
      res.status(401).json({
        msg: 'Token no válido.',
      });
    }
  }
};
