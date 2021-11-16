module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "mysql",
    DB: "catalogdb",
    dialect: "postgres",
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};