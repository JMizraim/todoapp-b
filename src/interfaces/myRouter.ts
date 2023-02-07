import { Router } from 'express';

export interface MyRouter {
  get path(): string;
  get router(): Router;
}
