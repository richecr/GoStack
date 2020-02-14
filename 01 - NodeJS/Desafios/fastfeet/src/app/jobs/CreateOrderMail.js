import Mail from '../../libs/Mail';

class CreateOrderMail {
  get key() {
    return 'CreateOrderMail';
  }

  async handle({ data }) {
    const { recipient, deliveryman, product } = data;

    const message = {
      from: 'no-reply@fastfeet.com',
      to: deliveryman.email,
      subject: 'Nova entrega cadastrada para você',
      template: 'createOrder',
      context: {
        name: recipient.name,
        city: recipient.city,
        street: recipient.street,
        state: recipient.state,
        product,
      },
    };

    await Mail.sendEmail(message);
  }
}

export default new CreateOrderMail();
