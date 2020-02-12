import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    const { name, email } = req.body;

    const courier = await Courier.create({
      name,
      email,
    });

    return res.json(courier);
  }

  async index(req, res) {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res
        .status(400)
        .json({ error: 'Courier with this ID does not exist' });
    }

    return res.json(courier);
  }

  async update(req, res) {
    const { id } = req.params;
    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res
        .status(400)
        .json({ error: 'Courier does not exist or deleted' });
    }

    await courier.update(req.body);

    return res.json(courier);
  }

  async delete(req, res) {
    const { id } = req.params;
    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res
        .status(400)
        .json({ error: 'Courier does not exist or deleted' });
    }

    await Courier.destroy({
      where: {
        id,
      },
    });

    return res.json({ message: 'The courier was deleted' });
  }
}

export default new CourierController();
