import jwt from 'jsonwebtoken';

export interface UserJwtPayload extends jwt.JwtPayload {
  _id: string;
  name: string;
}
