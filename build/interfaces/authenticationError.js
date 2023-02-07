"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
class AuthenticationError {
    constructor(message) {
        this.name = 'AuthenticationError';
        this.message = message;
    }
}
exports.AuthenticationError = AuthenticationError;
