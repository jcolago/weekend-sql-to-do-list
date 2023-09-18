//Sets up express for use
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//Get route to get the tabel data from database to be sent to front end to be displayed on DOM
router.get("/", (req, res) => {
    //testing for route
    console.log('GET request to /tasks');
    const queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;

    pool
        .query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('Error in GET request', err);
            res.sendStatus(500)
        });
});

//Takes data sent from front end and adds a new item to the tasks table in the database.
router.post("/", (req, res) => {
    //Testing for route
    console.log('POST request sent to /tasks');
    const task = req.body;
    //Testing for route with variable
    console.log('POST request at /tasks with data of', task);
    const queryText = `INSERT INTO "tasks" ("task_name", "completed")
                        VALUES($1, $2)`;

    if (!task.task_name) {
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


//Deletes an item from the database with a matching id number
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    //Testing for route
    console.log('DELETE request to /tasks/ with an id of:', id);
    const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

    if (!id) {
        res.sendStatus(400);
        return;
    }

    pool
        .query(queryText, [id])
        .then(() => res.sendStatus(204))
        .catch((err) => {
            console.log('Error in DELETing from tasks table', err);
            res.sendStatus(500);
        });
});

//Changes completed to true of task with matching id number
router.put("/:id", (req, res) => {
    const id = req.params.id
    //Testing for route
    console.log('PUT request to /tasks/ to update with id', id)
    const queryText = `UPDATE "tasks" SET "completed" = 'true' WHERE "id" = $1;`;

    pool
        .query(queryText, [id])
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log('Error in PUT request', err);
            res.sendStatus(500);
        });
});
//exports router for use
module.exports = router;