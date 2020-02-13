import { Router } from 'express';
import multer from 'multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

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
routes.post('/couriers', DeliverymanController.store);
routes.get('/couriers/:id', DeliverymanController.index);
routes.put('/couriers/:id', DeliverymanController.update);
routes.delete('/couriers/:id', DeliverymanController.delete);

// Uploads.
routes.post('/files', upload.single('avatar'), FileController.store);

export default routes;
