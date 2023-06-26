const mysql = require('mysql2');

// creating a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'pritam123',
});

module.exports = pool.promise();
