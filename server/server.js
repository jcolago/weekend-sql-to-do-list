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
    const queryText =  `INSERT INTO "tasks" ("task_name", "completed")
                        VALUES($1, $2)`;

    if (!task.task_name){
        res.sendStatus(400);
        return;
    }

    pool
    .query(queryText, [
        task.task_name,
        Boolean(task.completed),
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('Error in POST request', err);
        res.sendStatus(500);
    });
});

app.delete("/tasks/:id", (req, res) =>{
    const id = req.params.id;
    console.log('DELETE request to /tasks/ with an id of:', id);
    const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

    if (!id){
        req.sendStatus(400);
        return;
    }

    pool
    .query(queryText, [id])
    .then(()=> res.sendStatus(204))
    .catch((err)=> {
        console.log('Error in DELETing from tasks table', err);
        res.sendStatus(500);
    });
});

app.put("/tasks/:id", (req, res) =>{
    const id =req.params.id
    console.log('PUT request to /tasks/ to update with id', id)
})






app.listen(PORT, () => {
    console.log("listening on port", PORT);
});