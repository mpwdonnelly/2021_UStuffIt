const Sequelize = require('sequelize');

// for the localhost postgres db on the backend
// change these credentials to fit your own setup
module.exports = new Sequelize('catalogdb', 'miked', 'D92t84ow!', {
  host: 'localhost',
  dialect: 'postgres',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

