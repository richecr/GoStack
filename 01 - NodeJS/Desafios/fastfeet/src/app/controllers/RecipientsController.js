import * as yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street: yup.string().required(),
      number: yup.string(),
      complement: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      cep: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, street, number, complement, state, city, cep } = req.body;
    const recipient = await Recipients.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      id_recipient: yup.string().required(),
      name: yup.string(),
      street: yup.string(),
      number: yup.string(),
      complement: yup.string(),
      state: yup.string(),
      city: yup.string(),
      cep: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id_recipient,
      name = '',
      street = '',
      number = '',
      complement = '',
      state = '',
      city = '',
      cep = '',
    } = req.body;

    if (!(name || street || number || complement || state || city || cep)) {
      return res.status(400).json({ error: 'Request incorrect' });
    }

    const recipient = await Recipients.findByPk(id_recipient);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const recipientResponse = await recipient.update(req.body);

    return res.json(recipientResponse);
  }
}

export default new RecipientsController();
