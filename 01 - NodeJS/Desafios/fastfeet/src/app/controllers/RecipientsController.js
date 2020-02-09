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
}

export default new RecipientsController();
