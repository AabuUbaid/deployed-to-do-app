const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USERNAME,
    host: process.env.HOST,
    database: process.env.DATABASE, // Use process.env.DATABASE
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
});

// console.log('Database pool initialized with:', {
//     user: process.env.USERNAME,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     port: process.env.DBPORT,
// });

module.exports = pool;
