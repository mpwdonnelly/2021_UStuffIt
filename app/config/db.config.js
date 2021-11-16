module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "mysql",
    DB: "catalogdb",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};