import { Collection, ObjectId } from 'mongodb';
import { Category } from '../models';
import { Database } from './database';

export class CategoryService {
  private static db: Database = Database.instance;
  private static categoryCollection: Collection<Category> =
    this.db.useCollection<Category>('categories');

  private constructor() {}

  public static async getCategoriesByUserIdFromDb(
    user_id: ObjectId
  ): Promise<Category[]> {
    try {
      const cursor = this.categoryCollection.find({
        user_id: user_id,
      });
      const categories: Category[] = [];
      await cursor.forEach((category) => {
        categories.push(category);
      });
      return categories;
    } catch (err) {
      throw err;
    }
  }

  public static async getCategoryByIdFromDb(_id: ObjectId) {
    try {
      const category = await this.categoryCollection.findOne({ _id });
      return category;
    } catch (err) {
      throw err;
    }
  }

  public static async createCategoryInDb(category: Category) {
    try {
      const result = await this.categoryCollection.insertOne(category);
      const categoryCreated = await this.categoryCollection.findOne({
        _id: result.insertedId,
      });
      return categoryCreated;
    } catch (err) {
      throw err;
    }
  }

  public static async updateCategoryInDb(_id: ObjectId, name: string) {
    try {
      const categoryUpdated = await this.categoryCollection.findOneAndUpdate(
        { _id },
        {
          $set: {
            name,
          },
        },
        {
          returnDocument: 'after',
        }
      );
      return categoryUpdated.value;
    } catch (err) {
      throw err;
    }
  }

  public static async deleteCategoryInDb(_id: ObjectId) {
    try {
      const result = await this.categoryCollection.deleteOne({ _id });
      return result.deletedCount;
    } catch (err) {
      throw err;
    }
  }
}
