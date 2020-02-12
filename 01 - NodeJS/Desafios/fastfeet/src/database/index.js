import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import AdminUser from '../app/models/AdminUser';
import Recipients from '../app/models/Recipients';
import File from '../app/models/File';
import Courier from '../app/models/Courier';

const models = [User, AdminUser, Recipients, File, Courier];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
