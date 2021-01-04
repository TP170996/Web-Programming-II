"use strict";
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
/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
const mongoConnection_1 = require("./mongoConnection");
let getCollectionFn = (collection) => {
    let _col = undefined;
    return () => __awaiter(void 0, void 0, void 0, function* () {
        if (!_col) {
            let db = yield mongoConnection_1.dbConnection();
            _col = yield db.collection(collection);
        }
        return _col;
    });
};
exports.default = { moviesCollection: getCollectionFn('movies') };
