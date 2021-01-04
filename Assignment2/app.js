const express = require("express");
const path = require("path");

const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function (request, response) {
    response.sendFile(path.resolve("public/html/main.html"));
});

app.use("*", (request, response) => {
    response.status(404).sendFile(path.resolve("public/html/404.html"));
});

const port = 3000;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});