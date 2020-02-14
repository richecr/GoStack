import Mail from '../../libs/Mail';

class CancelOrderEmail {
  get key() {
    return 'CancelOrderEmail';
  }

  async handle({ data }) {
    const { recipient, deliveryman, product } = data;

    const message = {
      from: 'no-reply@fastfeet.com',
      to: deliveryman.email,
      subject: 'Uma entrega foi cancelada',
      template: 'cancellationOrder',
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

export default new CancelOrderEmail();
