//Hooking up express
const express = require("express");
const pool = require("./modules/pool");
const app = express();

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.get("/tasks", (req, res) => {
    console.log('GET request to /tasks');
    const queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;

    pool
        .query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('Error in GET reqyest', err);
            res.sendStatus(500)
        });
});

app.post("/tasks", (req, res) => {
    console.log('POST request sent to /tasks');
    const task = req.body;
    console.log('POST request at /tasks with data of', task);
    res.sendStatus(201);
});






app.listen(PORT, () => {
    console.log("listening on port", PORT);
});