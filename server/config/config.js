require("dotenv").config();
const pg = require('pg');//const { Client } = require('pg');
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT || 5432;

// const client = new Client({
//   user: dbUsername,
//   password: dbPassword,
//   database: dbName,
//   host: dbHost,
//   port: dbPort,
//   dialect: "postgres",
// })

const pool = new pg.Pool({
  user: dbUsername,
  password: dbPassword,
  database: dbName,
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
})

// client.connect();

console.log('connection created')

module.exports = {
  // client
  pool
}
