"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../../helpers");
class Database {
    constructor() {
        this._client = new mongodb_1.MongoClient((0, helpers_1.getURI)());
    }
    static get instance() {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.connect();
                console.log('*** Conexión establecida con la base de datos de MongoDB ***');
            }
            catch (err) {
                console.error(`Error al conectarse a la base de datos :(`);
                throw err;
            }
        });
    }
    useCollection(collectionName) {
        return this._client.db((0, helpers_1.getDbName)()).collection(collectionName);
    }
}
exports.Database = Database;
