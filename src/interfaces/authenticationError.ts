export class AuthenticationError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor(message: string) {
    this.name = 'AuthenticationError';
    this.message = message;
  }
}
