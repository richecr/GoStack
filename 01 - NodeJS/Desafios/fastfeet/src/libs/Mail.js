import nodemailer from 'nodemailer';
import { resolve } from 'path';
import nodemailerhbs from 'nodemailer-express-handlebars';

import MailConfig from '../config/nodemailer';

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
          layoutsDir: resolve(
            __dirname,
            '..',
            'app',
            'views',
            'emails',
            'layouts'
          ),
          partialsDir: resolve(
            __dirname,
            '..',
            'app',
            'views',
            'emails',
            'partials'
          ),
          defaultLayout: 'default',
          extname: '.hbs',
        },
        viewPath: resolve(__dirname, '..', 'app', 'views', 'emails'),
        extName: '.hbs',
      })
    );
  }

  sendEmail(message) {
    return this.transporter.sendMail(message);
  }
}

export default new Mail();
