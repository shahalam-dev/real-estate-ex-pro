'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  auth.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_varified: DataTypes.BOOLEAN,
    account_status: DataTypes.STRING,
    user_role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auth',
  });
  return auth;
};