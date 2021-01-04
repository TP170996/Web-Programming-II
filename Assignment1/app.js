/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/
import * as express from 'express';
import { Request, Response } from 'express';
const express = require('express');
const app =express();
const configRoutes = require('./routes');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//First Middleware
let count=0;
app.use('*',function(req,res,next){
    count++;
    console.log("Total Requests",+count)
    if(next)next();
    
})

//Second Middleware
app.use('*', function (req, res, next) {
    console.log("Request body: ");
    console.log(req.body);
    console.log("URL PATH: "+req.baseUrl);
    console.log("HTTP VERB: "+req.method);
    next();    
});

var urlReqTimes = {};
//Third Middleware
app.use('*', function (req, res, next) {
    
    if(urlReqTimes[req.baseUrl] == undefined){
        urlReqTimes[req.baseUrl] = 0;
    }else{
        urlReqTimes[req.baseUrl]++;
    }
    console.log("URL Request Times");
    console.log(urlReqTimes);
    console.log("\n");
    next();    
});

configRoutes(app);

app.listen(3000, () => {
    console.log("Server on!");
    console.log("Routes will be running at http://localhost:3000");
});