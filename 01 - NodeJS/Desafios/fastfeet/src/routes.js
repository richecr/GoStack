import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Login de um Admin.
routes.post('/sessions', SessionController.store);

export default routes;
