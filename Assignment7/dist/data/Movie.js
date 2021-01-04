"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongodb_1 = require("mongodb");
class Movie {
    constructor(movie) {
        this._id = new mongodb_1.ObjectID();
        this.title = movie.title;
        this.cast = movie.cast;
        this.info = movie.info;
        this.plot = movie.plot;
        this.rating = movie.rating;
        this.comments = movie.comments || [];
    }
}
exports.Movie = Movie;
