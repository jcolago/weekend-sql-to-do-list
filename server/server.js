//Hooking up express
const express = require("express");
const app = express();

app.use(express.static("server/public"));
app.use(express.urlencoded({extended: true}));

const PORT = 5000;










app.listen(PORT, () =>{
    console.log("listening on port", PORT);
});