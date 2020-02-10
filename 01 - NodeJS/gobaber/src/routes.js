import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(MulterConfig);

// Rotas sem Middlewares
// Users
routes.post('/users', UserController.store);

// Sessions
routes.post('/sessions', SessionController.store);

// Rotas com middlewares
routes.use(authMiddlewares);

// Users
routes.put('/users', UserController.update);

// Upload
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
