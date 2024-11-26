const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_SERVER_HOST,
    user: process.env.DB_SERVER_USER,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DB_SERVER_DB_NAME
});

module.exports = pool;