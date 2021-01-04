/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 Lecture 11 codebase, stackoverflow-----*/
import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import {Routes} from './routes';

let count: object = {};
let maxLength: number = 0;
let countReq:number =0;

class App{
    public app: express.Application;
    public routes: Routes = new Routes();
    constructor() {
        this.app = express(); 
        this.config();
        this.routes.routes(this.app);
    }

    private firstMiddleware =function (request: express.Request, response: express.Response, next: Function): void {
        
            countReq++;
            console.log(`\n\ntotal requests:${countReq}`)
            next()
    };

    private secondMiddleware = function (request: express.Request, response: express.Response, next: Function): void {
       
        console.log(`\nrequest method: ${request.method}\n request url: ${request.originalUrl}\nBODY:\n${JSON.stringify(request.body, null, 2)}`);
        next()
    };

    private thirdMiddleware = function (request: express.Request, response: express.Response, next: Function): void {

        if (count.hasOwnProperty(request.originalUrl)) {
            count[request.originalUrl] += 1;
        } else {
            count[request.originalUrl] = 1;
            maxLength = Math.max(maxLength, request.originalUrl.length)
        }
        
        let url: string
        for (url in count) {
            console.log(`\n request url:${url}\n request url count :${count[url]}`)
        }

        next()
    };

    private config(): void {
       
        this.app.use(bodyParser.json());
       
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
        this.app.use(this.firstMiddleware);
        this.app.use(this.secondMiddleware);
        this.app.use(this.thirdMiddleware);
        
    }
}

export default new App().app;
