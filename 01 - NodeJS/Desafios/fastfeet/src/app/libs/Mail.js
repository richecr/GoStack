import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expresshbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import MailConfig from '../../config/nodemailer';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(MailConfig);

    this.init();
  }

  init() {
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: {
          layoutsDir: resolve(__dirname, '..', 'views', 'emails', 'layouts'),
          partialsDir: resolve(__dirname, '..', 'views', 'emails', 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        },
        viewPath: resolve(__dirname, '..', 'views', 'emails'),
        extName: '.hbs',
      })
    );
  }

  async sendEmail(message) {
    await this.transporter.sendMail(message);
  }
}

export default new Mail();
