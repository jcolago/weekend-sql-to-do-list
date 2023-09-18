//Hooking up express
const express = require("express");
const pool = require("./modules/pool");
const app = express();
//Allows middleware for testing
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

//Connects task.router.js to server for all request to/tasks
const tasksRouter = require("./routers/tasks.router");
app.use("/tasks", tasksRouter);



//Console log to run when connected to server
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});