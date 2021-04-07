'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate title
      validate: {
        notNull: {
          msg: 'Please fill the title input'
        },
        notEmpty: {
          msg: 'Please fill the title input'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate author input
      validate: {
        notNull: {
          msg: 'Please provide author for this input.'
        },
        notEmpty: {
          msg: 'Please fill the author input'
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};