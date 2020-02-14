import { Op } from 'sequelize';

import Queue from '../../libs/Queue';
import CancelOrderEmail from '../jobs/CancelOrderEmail';

import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Order from '../models/Order';

class DeliveryProblemController {
  async store(req, res) {
    const { id_order } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(id_order);
    if (!order) {
      return res.status(400).json({ error: 'The Order with ID not exists' });
    }

    if (!order.start_date) {
      return res.status(400).json({
        error: 'The order has no problems without leaving for delivery',
      });
    }

    if (order.end_date) {
      return res.status(400).json({
        error: 'The order has no problems if it has already been delivered',
      });
    }

    const deliveryProblem = await DeliveryProblem.create({
      order_id: id_order,
      description,
    });

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const ordersWithProblems = await DeliveryProblem.findAll({
      attributes: ['order_id'],
    });

    const idsOrdersWithProblems = [];
    ordersWithProblems.map(obj => {
      if (!idsOrdersWithProblems.includes(obj.order_id)) {
        idsOrdersWithProblems.push(obj.order_id);
      }
    });

    const orders = await DeliveryProblem.findAll({
      where: {
        order_id: {
          [Op.in]: idsOrdersWithProblems,
        },
      },
      attributes: ['id', 'order_id', 'description'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: [
            'product',
            'start_date',
            'recipient_id',
            'deliveryman_id',
          ],
        },
      ],
    });

    return res.json(orders);
  }

  async delete(req, res) {
    const { id_problem } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id_problem);
    if (!deliveryProblem) {
      return res
        .status(400)
        .json({ error: 'The Delivery Problem with ID not exists' });
    }

    const order = await Order.findByPk(deliveryProblem.order_id);
    order.update({
      canceled_at: new Date(),
    });
    order.save();

    const recipient = await Recipient.findByPk(order.recipient_id);
    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    await Queue.add(CancelOrderEmail.key, {
      recipient,
      deliveryman,
      product: order.product,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
