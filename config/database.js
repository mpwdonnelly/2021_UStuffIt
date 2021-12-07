const Sequelize = require('sequelize');

// for the localhost postgres db on the backend
// change these credentials to fit your own setup
//////////////////////////////////////////////////////////////////////////
// ******** DISABLE LINES 8-19 IF DEPLOYING TO HEROKU ****************
//////////////////////////////////////////////////////////////////////////
module.exports = new Sequelize('catalogdb', 'postgres', 'mysql', {
  host: 'localhost',
  dialect: 'postgres',
  //quoteIdentifiers: false,
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

//////////////////////////////////////////////////////////////////////////
// ******** ENABLE LINES 24-33 IF DEPLOYING TO HEROKU ****************
//////////////////////////////////////////////////////////////////////////
// module.exports = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   quoteIdentifiers: false,
//   dialectOptions: {
//       ssl: {
//           require: true,
//           rejectUnauthorized: false
//       }
//   }
// });