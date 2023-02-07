"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const helpers_1 = require("../helpers");
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const path_1 = __importDefault(require("path"));
class Server {
    constructor(port) {
        this.routers = (routers) => {
            for (const { path, router } of routers) {
                this._app.use(path, router);
            }
            this._app.get('*', (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, '../../', 'public/index.html'));
            });
        };
        this.connectToDatabase();
        this._app = (0, express_1.default)();
        this._port = port;
        this.middlewares();
        this.routers([
            new routes_1.TaskRoutes(),
            new routes_1.UserRoutes(),
            new routes_1.CategoryRoutes(),
            new routes_1.AuthRoutes(),
        ]);
    }
    connectToDatabase() {
        const db = services_1.Database.instance;
        db.connect();
    }
    middlewares() {
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.static('public')); // Para servir contenido estático
    }
    static get instance() {
        if (!Server._instance) {
            const port = Number((0, helpers_1.getPORT)());
            Server._instance = new Server(port);
        }
        return Server._instance;
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log(`*** El servidor está escuchando en el puerto ${this._port} ***`);
        });
    }
}
exports.Server = Server;
