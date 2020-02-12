import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';

import AuthRecipients from './app/middlewares/Auth';

import MulterConfig from './config/multer';

const routes = new Router();
const upload = multer(MulterConfig);

/**
 * avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'file',
          key: 'id',
        },
      },
 */
// Login de um Admin.
routes.post('/sessions', SessionController.store);

routes.use(AuthRecipients);

// Cadastrar um recipient.
routes.post('/recipients', RecipientsController.store);
// Atualizar um recipient.
routes.put('/recipients', RecipientsController.update);

// Couriers.
routes.post('/couriers', CourierController.store);
routes.get('/couriers/:id', CourierController.index);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.delete);

// Uploads.
routes.post('/files', upload.single('avatar'), FileController.store);

export default routes;
