require('dotenv').config(); /* requiring the correct env file to gitignore */

const Sequelize = require('sequelize'); /* requiring sequelize */

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',  /* setting the host and making sure it's a decimal */
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
