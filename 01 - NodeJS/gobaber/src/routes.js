import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

// Rotas sem Middlewares
// Users
routes.post('/users', UserController.store);

// Sessions
routes.post('/sessions', SessionController.store);

// Rotas com middlewares
routes.use(authMiddlewares);

// Users
routes.put('/users', UserController.update);

export default routes;
