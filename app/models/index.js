const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

//***************************************************************/
// DISABLED TO ALLOW FOR HEROKU DEPLOYMENT WITH SEQUELIZE.
// DO NOT RE-ENABLE, SAVING FOR LEGACY. ONLY RE-ENABLE FOR LOCAL
// NODE SERVER.JS WORK, IN WHICH CASE DISABLE LINES 23-32. -AS 11/15/21
//***************************************************************/
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// ADDED TO ALLOW SEQUELIZE TO FUNCTION WITH HEROKU DEPLOYMENT -AS 11/15/21
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.catalogs = require("./catalog.model.js")(sequelize, Sequelize);

module.exports = db;