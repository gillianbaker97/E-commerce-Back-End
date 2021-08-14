const { Model, DataTypes } = require('sequelize');  /* package configuration */

const sequelize = require('../config/connection.js');

class Category extends Model {}  /* making the class Category able to extend the Model */

Category.init(   /* specifying parts of the Category */
  {
    category_id: {
      type: DataTypes.Integer,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
