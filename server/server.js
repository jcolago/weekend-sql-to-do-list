//Hooking up express
const express = require("express");
const pool = require("./modules/pool");
const app = express();

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

const tasksRouter = require("./routers/tasks.router");
app.use("/tasks", tasksRouter);






app.listen(PORT, () => {
    console.log("listening on port", PORT);
});