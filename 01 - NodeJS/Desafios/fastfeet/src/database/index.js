import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import AdminUser from '../app/models/AdminUser';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';

const models = [User, AdminUser, Recipients, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
