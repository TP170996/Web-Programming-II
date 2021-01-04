/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
import {ObjectId, ObjectID} from "mongodb"

export interface IComment {
    _id: ObjectId,
    name: string,
    comment: string
}

export class Comment implements IComment {
    _id: ObjectId;
    name: string;
    comment: string;

    constructor(comment: IComment) {
        this._id = new ObjectID()
        this.name = comment.name
        this.comment = comment.comment
    }
}