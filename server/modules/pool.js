//Connecting PG
const pg = require("pg");
const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "weekend-to-do-app",
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on("connect", () => console.log("Successfully connected to postgres"));

pool.on("error", (err) => console.log("Error in connection to postgres", err));

module.exports = pool;