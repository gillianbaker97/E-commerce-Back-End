// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  /* setting up primary and foreign keys */
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.Decimal,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
//instance of our foreign key below:
    category_id: {
      type: DataTypes.INTEGER,
      References: {
        model: 'Category',
        id: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

