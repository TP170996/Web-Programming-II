/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
import {IComment} from "./Comment";
import {ObjectId, ObjectID} from "mongodb"

export interface IMovie {
    _id: ObjectId,
    title: string,
    cast:[{firstName:string, lastName:string}],
    info:{director:string,yearReleased:number},
    plot: string,
    rating:number,
    comments: Array<IComment>
}

export class Movie implements IMovie {
    _id: ObjectId;
    title: string;
    cast:[{firstName:string, lastName:string}];
    info:{director:string,yearReleased:number};
    plot: string;
    rating:number;
    comments: Array<IComment>

    constructor(movie: IMovie) {
        this._id = new ObjectID()
        this.title = movie.title
        this.cast=movie.cast
        this.info = movie.info
        this.plot = movie.plot
        this.rating = movie.rating
        this.comments = movie.comments || []
    }
}