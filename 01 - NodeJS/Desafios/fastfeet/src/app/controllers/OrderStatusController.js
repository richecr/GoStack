import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class OrderStatusController {
  async store(req, res) {
    return res.json({ ok: true });
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      delivered: Yup.boolean(),
      page: Yup.number(),
    });

    if (!(await schema.isValid({ ...req.query, ...req.params }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { delivered = false, page = 1 } = req.query;
    const { deliveryman_id } = req.params;

    const orders = await Order.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: delivered ? { [Op.ne]: null } : { [Op.eq]: null },
      },
      attributes: ['id', 'product', 'recipient_id', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderStatusController();
