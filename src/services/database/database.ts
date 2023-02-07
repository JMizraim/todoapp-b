import { Collection, MongoClient, Document } from 'mongodb';
import { getDbName, getURI } from '../../helpers';

export class Database {
  private _client: MongoClient;
  private static _instance: Database | undefined;

  private constructor() {
    this._client = new MongoClient(getURI());
  }

  public static get instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }

  public async connect(): Promise<void> {
    try {
      await this._client.connect();
      console.log(
        '*** Conexión establecida con la base de datos de MongoDB ***'
      );
    } catch (err) {
      console.error(`Error al conectarse a la base de datos :(`);
      throw err;
    }
  }

  public useCollection<T extends Document>(
    collectionName: 'tasks' | 'users' | 'categories'
  ): Collection<T> {
    return this._client.db(getDbName()).collection<T>(collectionName);
  }
}
