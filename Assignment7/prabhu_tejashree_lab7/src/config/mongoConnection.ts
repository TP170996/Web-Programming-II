/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/

import {MongoClient} from "mongodb";
const settings ={
    mongoConfig:{
        serverUrl:"mongodb://localhost:27017/",
        database: "Prabhu-Tejashree-CS554-Lab7"
    }
};

let mongoConfig: any = settings.mongoConfig;

let _connection: any = undefined;
let _db :any = undefined;

let dbConnection : any = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(mongoConfig.serverUrl,{
            useNewUrlParser: true
        });
        _db = await _connection.db(mongoConfig.database)
    }
    return _db;
};

export {dbConnection}
