import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class AdminUser extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(oldPassword) {
    return bcryptjs.compare(oldPassword, this.password_hash);
  }
}

export default AdminUser;
