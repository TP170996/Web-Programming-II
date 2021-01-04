"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 Lecture 11 codebase, stackoverflow-----*/
const express = require("express");
const bodyParser = require("body-parser"); //used to parse the form data that you pass in the request
const routes_1 = require("./routes");
let count = {};
let maxLength = 0;
let countReq = 0;
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.firstMiddleware = function (request, response, next) {
            countReq++;
            console.log(`\n\ntotal requests:${countReq}`);
            next();
        };
        this.secondMiddleware = function (request, response, next) {
            console.log(`\nrequest method: ${request.method}\n request url: ${request.originalUrl}\nBODY:\n${JSON.stringify(request.body, null, 2)}`);
            next();
        };
        this.thirdMiddleware = function (request, response, next) {
            if (count.hasOwnProperty(request.originalUrl)) {
                count[request.originalUrl] += 1;
            }
            else {
                count[request.originalUrl] = 1;
                maxLength = Math.max(maxLength, request.originalUrl.length);
            }
            let url;
            for (url in count) {
                console.log(`\n request url:${url}\n request url count :${count[url]}`);
            }
            next();
        };
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(this.firstMiddleware);
        this.app.use(this.secondMiddleware);
        this.app.use(this.thirdMiddleware);
    }
}
exports.default = new App().app;
