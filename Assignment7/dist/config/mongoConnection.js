"use strict";
/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongodb_1 = require("mongodb");
const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "Prabhu-Tejashree-CS554-Lab7"
    }
};
let mongoConfig = settings.mongoConfig;
let _connection = undefined;
let _db = undefined;
let dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!_connection) {
        _connection = yield mongodb_1.MongoClient.connect(mongoConfig.serverUrl, {
            useNewUrlParser: true
        });
        _db = yield _connection.db(mongoConfig.database);
    }
    return _db;
});
exports.dbConnection = dbConnection;
