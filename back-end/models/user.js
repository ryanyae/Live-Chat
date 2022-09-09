'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    firstName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};