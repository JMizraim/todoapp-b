import { User } from '../models';
import { Collection, ObjectId } from 'mongodb';
import { Database } from './database';
import { getSecretKey } from '../helpers';
import { AuthenticationError, UserJwtPayload } from '../interfaces';
import jwt from 'jsonwebtoken';

export class UserService {
  private static db: Database = Database.instance;
  private static userCollection: Collection<User> =
    this.db.useCollection<User>('users');

  private constructor() {}

  static async getUserByIdFromDb(_id: ObjectId) {
    try {
      const user = await this.userCollection.findOne({ _id });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async getUserByEmailFromDb(email: string) {
    try {
      const user = await this.userCollection.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async createUserInDb(user: User) {
    try {
      const result = await this.userCollection.insertOne(user);
      const userCreated = await this.userCollection.findOne({
        _id: new ObjectId(result.insertedId),
      });
      if (!userCreated)
        throw new AuthenticationError('Error al obtener el usuario creado');
      return userCreated;
    } catch (err) {
      throw err;
    }
  }

  static async updateUserInDb(_id: ObjectId, { _id: ignore, ...rest }: User) {
    try {
      const userUpdated = await this.userCollection.findOneAndReplace(
        { _id },
        {
          ...rest,
        },
        {
          returnDocument: 'after',
        }
      );
      return userUpdated.value;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUserInDb(_id: ObjectId) {
    try {
      const result = await this.userCollection.deleteOne({ _id });
      return result.deletedCount;
    } catch (err) {
      throw err;
    }
  }

  static getJWT = (_id: string, name: string) => {
    const payload: UserJwtPayload = { _id, name };
    return new Promise<string | undefined>((resolve, reject) => {
      const secretKey: string = getSecretKey();
      jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  };
}
