import { getPORT } from '../helpers';
import { MyRouter } from '../interfaces';
import { TaskRoutes, UserRoutes, CategoryRoutes, AuthRoutes } from '../routes';
import cors from 'cors';
import express from 'express';
import { Database } from '../services';
import path from 'path';

export class Server {
  private _app: express.Application;
  private _port: number;
  private static _instance: Server;

  private constructor(port: number) {
    this.connectToDatabase();
    this._app = express();
    this._port = port;
    this.middlewares();
    this.routers([
      new TaskRoutes(),
      new UserRoutes(),
      new CategoryRoutes(),
      new AuthRoutes(),
    ]);
  }

  private connectToDatabase(): void {
    const db = Database.instance;
    db.connect();
  }

  private middlewares(): void {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(express.static('public')); // Para servir contenido estático
  }

  private routers = (routers: MyRouter[]): void => {
    for (const { path, router } of routers) {
      this._app.use(path, router);
    }
    this._app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../', 'public/index.html'));
    });
  };

  public static get instance(): Server {
    if (!Server._instance) {
      const port: number = Number(getPORT());
      Server._instance = new Server(port);
    }
    return Server._instance;
  }

  public listen(): void {
    this._app.listen(this._port, () => {
      console.log(
        `*** El servidor está escuchando en el puerto ${this._port} ***`
      );
    });
  }
}
