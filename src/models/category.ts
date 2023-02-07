import { ObjectId } from 'mongodb';

export class Category {
  constructor(
    public name: string,
    public user_id: ObjectId,
    public _id?: ObjectId
  ) {}
}
