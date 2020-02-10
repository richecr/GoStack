import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

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

// Providers
routes.get('/providers', ProviderController.index);

// Appointments
routes.post('/appointments', AppointmentController.store);

// Uploads
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
