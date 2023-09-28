//Connecting PG
const pg = require("pg");

let config = {};

if (process.env.DATABASE_URL) {
    config = {
      connectionString: process.env.DATABASE_URL,
    };
  } else {
    config = {
      database: "weekend-to-do-app",
      host: "localhost",
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
    };
  }



const pool = new pg.Pool(config)

//Console log to run on successful connet and error on connection failure
pool.on("connect", () => console.log("Successfully connected to postgres"));

pool.on("error", (err) => console.log("Error in connection to postgres", err));

module.exports = pool;