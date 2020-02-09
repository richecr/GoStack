import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import AuthRecipients from './app/middlewares/Auth';

const routes = new Router();

// Login de um Admin.
routes.post('/sessions', SessionController.store);

routes.use(AuthRecipients);

// Cadastrar um recipient.
routes.post('/recipients', RecipientsController.store);

export default routes;
