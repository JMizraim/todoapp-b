"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPORT = exports.getSecretKey = exports.getDbName = exports.getURI = void 0;
const getURI = () => {
    const URI = process.env.URI || '';
    if (!URI)
        throw new Error('No se encontró URI en .env');
    return URI;
};
exports.getURI = getURI;
const getDbName = () => {
    const dbName = process.env.DB_NAME || '';
    if (!dbName)
        throw new Error('No se encontró DB_NAME en .env');
    return dbName;
};
exports.getDbName = getDbName;
const getSecretKey = () => {
    const secretKey = process.env.SECRET_KEY || '';
    if (!secretKey)
        throw new Error('No se encontró SECRET_KEY en .env');
    return secretKey;
};
exports.getSecretKey = getSecretKey;
const getPORT = () => {
    const PORT = process.env.PORT || '';
    if (!PORT)
        throw new Error('No se encontro PORT en .env');
    return PORT;
};
exports.getPORT = getPORT;
