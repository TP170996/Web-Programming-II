/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const Mongoclient = require("mongodb").MongoClient;
const settings ={
    mongoConfig:{
        serverUrl:"mongodb://localhost:27017/",
        database: "Prabhu-Tejashree-CS554-Lab7"
    }
};

const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        _connection = await Mongoclient.connect(mongoConfig.serverUrl,{
            useNewUrlParser: true
        });
        _db = await _connection.db(mongoConfig.database)
    }
    return _db;
};

