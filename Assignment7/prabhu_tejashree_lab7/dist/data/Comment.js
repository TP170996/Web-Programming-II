"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
const mongodb_1 = require("mongodb");
class Comment {
    constructor(comment) {
        this._id = new mongodb_1.ObjectID();
        this.name = comment.name;
        this.comment = comment.comment;
    }
}
exports.Comment = Comment;
