import Sequelize, { Model } from 'sequelize';

class users extends Model {
  static init(sequelize) {
    super.init(
      {
        usr_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        usr_pix: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'users',
        tableName: 'users',
        createdAt: false,
        updatedAt: false,
        //timestamps: false,
      }
    );

    return this;
  }
}

export default users;
