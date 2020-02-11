import { Router } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

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
routes.get('/providers/:providerId/available', AvailableController.index);

// Appointments do provider logado.
routes.get('/schedule', ScheduleController.index);

// Appointments
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

// Notifications de um provider.
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Uploads
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
