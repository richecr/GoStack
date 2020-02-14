import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay } from 'date-fns';

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
      limit: 15,
      offset: (page - 1) * 15,
    });

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id_order: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      start_date: Yup.string(),
      end_date: Yup.string()
        .required()
        .when('start_date', (start_date, field) =>
          start_date ? field.notRequired() : field
        ),
    });

    if (!(await schema.isValid({ ...req.params, ...req.query }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id_order, deliveryman_id } = req.params;
    const { start_date, end_date } = req.query;

    /**
     * Checks whether the order with the passed ID exists.
     */
    const order = await Order.findByPk(id_order);
    if (!order) {
      return res.status(400).json({ error: 'O pedido com este ID não existe' });
    }

    /**
     * Verificar se vai atualizar a data de retirada.
     */
    if (start_date) {
      const searchDate = Number(start_date);

      if (isBefore(searchDate, new Date())) {
        return res
          .status(400)
          .json({ error: 'start_date must be a date after the current date' });
      }

      const ordersDeliveryman = await Order.findAll({
        where: {
          deliveryman_id,
          start_date: {
            [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
          },
        },
      });

      if (ordersDeliveryman.length === 5) {
        return res.status(400).json({
          error:
            'The deliveryman with this ID already has 5 withdrawals (maximum value) for that day',
        });
      }

      const date = new Date();
      date.setTime(searchDate);

      await order.update({
        start_date: date,
      });
    } else {
      /**
       * Verificar se vai atualizar a data de entrega.
       */
      const endDate = Number(end_date);
      if (!order.start_date) {
        return res.status(400).json({
          error: 'The order cannot have been delivered without a pick-up date',
        });
      }

      if (isBefore(endDate, order.start_date)) {
        return res.status(400).json({
          error:
            'The order cannot have a delivery date before the pick-up date',
        });
      }

      const date = new Date();
      date.setTime(end_date);

      await order.update({
        end_date: date,
      });
    }

    return res.json(order);
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderStatusController();
