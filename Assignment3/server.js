

const express = require('express');
const bluebird = require('bluebird');
const redis = require('redis');

const data = require('./data.js');

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


let most_recent_ids = [];

app.get("/", async function (request, response) {
    let most_recent = [];
    for (let i = 0; i < most_recent_ids.length && i < 10; i++) {
        most_recent.push(
            JSON.parse(await client.getAsync(most_recent_ids[i]))
        );
    }
    response.send(most_recent);
});

app.post("/search", async function (request, response) {
    let most_recent = [];
    for (let i = 0; i < most_recent_ids.length && i < 10; i++) {
        most_recent.push(
            JSON.parse(await client.getAsync(most_recent_ids[i]))
        );
    }
    response.send(most_recent);
});

app.get("/popularsearches", async function (request, response) {
    let most_recent = [];
    for (let i = 0; i < most_recent_ids.length && i < 10; i++) {
        most_recent.push(
            JSON.parse(await client.getAsync(most_recent_ids[i]))
        );
    }
    response.send(most_recent);
});


app.get("/show/:id", async function (request, response) {
    const id = request.params.id;
    const cacheResponse = await client.getAsync(id);

    if (cacheResponse) {
        response.json({ show: JSON.parse(cacheResponse) });
        most_recent_ids.unshift(id);
    } else {
        try {
            show = await data.getById(parseInt(id, 10));
            response.json({ show });
            most_recent_ids.unshift(id);
            let cacheRequest = await client.setAsync(id,
                                                     JSON.stringify(show));
        } catch (errorMessage) {
            if (typeof(errorMessage) === 'object') {
                response.status(404).json({ error: errorMessage.error });
            } else {
                response.status(400).json({ error: errorMessage });
            }
        }
    }
});



/**
 * Catch anything else and give a 404
 */
app.use("*", function (request, response) {
    response.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, function() {
    console.log("Server is now listening on port 3000.");
});
