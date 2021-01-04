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
const collection = require(".././config/mongoCollection");
const Movie_1 = require("./Movie");
const Comment_1 = require("./Comment");
const mongodb_1 = require("mongodb");
const _ = require('underscore');
class Movies {
    getMoviesById(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (movieId === undefined || movieId === null) {
                return "Movie not found";
            }
            let movieID = new mongodb_1.ObjectID();
            try {
                movieID = new mongodb_1.ObjectID(movieId);
            }
            catch (e) {
                return "Movie not find";
            }
            const moviesCollection = yield collection.default.moviesCollection();
            let Movie = yield moviesCollection.findOne({ _id: movieID });
            if (Movie === null) {
                return "Movie not found";
            }
            ;
            return Movie;
        });
    }
    getAllMovies(takeString, skipString) {
        return __awaiter(this, void 0, void 0, function* () {
            let take = parseInt(takeString);
            if (isNaN(take)) {
                return "take not a number";
            }
            let skip = parseInt(skipString);
            if (isNaN(skip)) {
                return "skip not a number";
            }
            take = take < 100 ? take : 100;
            if (take === 0) {
                return [];
            }
            const moviesCollection = yield collection.default.moviesCollection();
            return yield moviesCollection.find().limit(take).skip(skip).toArray();
        });
    }
    addMovie(newMovie) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newMovie === undefined || _.isEmpty(newMovie)) {
                return "Movie Not defined";
            }
            else if (typeof newMovie !== "object") {
                return "Invalid Movie";
            }
            if (!newMovie.hasOwnProperty("title") || newMovie["title"] === "" || newMovie["title"] === undefined || newMovie["title"] === null) {
                return "title Missing";
            }
            else if (typeof newMovie["title"] !== "string") {
                return "title not a string";
            }
            for (let i = 0; i < newMovie["cast"].length; i++) {
                if (!newMovie["cast"][i].hasOwnProperty("firstName") || newMovie["cast"][i]["firstName"] === "") {
                    return " Missing FirstName";
                }
                else if (typeof newMovie["cast"][i]["firstName"] !== "string") {
                    return "firstname not a string";
                }
                if (!newMovie["cast"][i].hasOwnProperty("lastName") || newMovie["cast"][i]["lastName"] === "") {
                    return "lastName missing";
                }
                else if (typeof newMovie["cast"][i]["lastName"] !== "string") {
                    return "lastName not a string";
                }
            }
            if (!newMovie.info.hasOwnProperty("director") || newMovie.info.director === "") {
                return "director missing";
            }
            else if (typeof newMovie.info.director !== "string") {
                return " director not a string";
            }
            if (!newMovie.info.hasOwnProperty("yearReleased")) {
                return "year released missing";
            }
            else if (typeof newMovie.info.yearReleased !== "number") {
                return " yearReleased not a number";
            }
            if (!newMovie.hasOwnProperty("plot") || newMovie["plot"] === "") {
                return "plot missing";
            }
            else if (typeof newMovie["plot"] !== "string") {
                return "plot not string";
            }
            if (!newMovie.hasOwnProperty("rating")) {
                return "rating empty";
            }
            else if (typeof newMovie["rating"] !== "number") {
                return "rating not number";
            }
            if (!newMovie.hasOwnProperty("comments")) {
                newMovie["comments"] = [];
            }
            else if (!Array.isArray(newMovie["comments"])) {
                return "invalid comments";
            }
            for (let i = 0; i < newMovie["comments"].length; i++) {
                if (!newMovie["comments"][i].hasOwnProperty("name")) {
                    return " Missing Name";
                }
                else if (typeof newMovie["comments"][i]["name"] !== "string") {
                    return "Invalid name ";
                }
                if (!newMovie["comments"][i].hasOwnProperty("comment")) {
                    return "comment missing";
                }
                else if (typeof newMovie["comments"][i]["comment"] !== "string") {
                    return "Comment not a string";
                }
                newMovie["comments"][i] = new Comment_1.Comment(newMovie["comments"][i]);
            }
            try {
                newMovie = new Movie_1.Movie(newMovie);
            }
            catch (e) {
                return "error";
            }
            const moviesCollection = yield collection.default.moviesCollection();
            const insertInfo = yield moviesCollection.insertOne(newMovie);
            if (insertInfo.insertedCount === 0) {
                return "Could not insert";
            }
            else {
                const newId = insertInfo.insertedId.toString();
                return yield this.getMoviesById(newId);
            }
        });
    }
    updateMovie(movieId, updatedMovie, patchMovie) {
        return __awaiter(this, void 0, void 0, function* () {
            let movieID = new mongodb_1.ObjectID();
            movieID = new mongodb_1.ObjectID(movieId);
            try {
                movieID === undefined;
            }
            catch (e) {
                return "movie not found";
            }
            if (updatedMovie === undefined || _.isEmpty(updatedMovie)) {
                return "updated movie not found";
            }
            else if (typeof updatedMovie !== "object") {
                return "invalid movie";
            }
            if (!patchMovie) {
                if (!updatedMovie.hasOwnProperty("title") || updatedMovie["title"] === "") {
                    return "missing title";
                }
                else if (updatedMovie.hasOwnProperty("title") && typeof updatedMovie["title"] !== "string") {
                    return "invalid title";
                }
                if (!updatedMovie.hasOwnProperty("cast")) {
                    return "missing cast";
                }
                for (let i = 0; i < updatedMovie["cast"].length; i++) {
                    if (!updatedMovie["cast"][i].hasOwnProperty("firstName") || updatedMovie["cast"][i]["firstName"] === "") {
                        return " Missing FirstName";
                    }
                    else if (updatedMovie["cast"][i].hasOwnProperty("firstName") && typeof updatedMovie["cast"][i]["firstName"] !== "string") {
                        return "firstname invalid";
                    }
                    if (!updatedMovie["cast"][i].hasOwnProperty("lastName") || updatedMovie["cast"][i]["lastName"] === "") {
                        return "lastName missing";
                    }
                    else if (updatedMovie["cast"][i].hasOwnProperty("lastName") && typeof updatedMovie["cast"][i]["lastName"] !== "string") {
                        return "lastName invalid";
                    }
                }
                if (!updatedMovie.hasOwnProperty("info")) {
                    return "missing info";
                }
                if (!updatedMovie.info.hasOwnProperty("director") || updatedMovie.info["director"] === "") {
                    return "director missing";
                }
                else if (updatedMovie.info.hasOwnProperty("director") && typeof updatedMovie.info["director"] !== "string") {
                    return "director not valid";
                }
                if (!updatedMovie.info.hasOwnProperty("yearReleased")) {
                    return "year released missing";
                }
                else if (updatedMovie.info.hasOwnProperty("yearReleased") && typeof updatedMovie.info["yearReleased"] !== "number") {
                    return "year released not valid";
                }
                if (!updatedMovie.hasOwnProperty("plot") || updatedMovie["plot"] === "") {
                    return "plot missing";
                }
                else if (updatedMovie.hasOwnProperty("plot") && typeof updatedMovie["plot"] !== "string") {
                    return " plot invalid";
                }
                if (!updatedMovie.hasOwnProperty("rating")) {
                    return "rating missing";
                }
                else if (updatedMovie.hasOwnProperty("rating") && typeof updatedMovie["rating"] !== "number") {
                    return " rating invalid";
                }
            }
            else if (patchMovie) {
                if (updatedMovie.hasOwnProperty("title") && updatedMovie["title"] === "") {
                    return "missing title";
                }
                else if (updatedMovie.hasOwnProperty("title") && typeof updatedMovie["title"] !== "string") {
                    return "invalid title";
                }
                if (updatedMovie.hasOwnProperty("cast")) {
                    for (let i = 0; i < updatedMovie["cast"].length; i++) {
                        if (!updatedMovie["cast"][i].hasOwnProperty("firstName") || updatedMovie["cast"][i]["firstName"] === "") {
                            return " Missing FirstName";
                        }
                        else if (typeof updatedMovie["cast"][i]["firstName"] !== "string") {
                            return "firstname invalid";
                        }
                        if (!updatedMovie["cast"][i].hasOwnProperty("lastName") || updatedMovie["cast"][i]["lastName"] === "") {
                            return "lastName missing";
                        }
                        else if (typeof updatedMovie["cast"][i]["lastName"] !== "string") {
                            return "lastName invalid";
                        }
                    }
                }
                if (updatedMovie.hasOwnProperty("info")) {
                    if (!updatedMovie.info.hasOwnProperty("director") || updatedMovie.info["director"] === "") {
                        return "director missing";
                    }
                    else if (typeof updatedMovie.info["director"] !== "string") {
                        return "director not valid";
                    }
                    if (!updatedMovie.info.hasOwnProperty("yearReleased") || typeof updatedMovie.info["yearReleased"] !== "number") {
                        return "year released not valid";
                    }
                }
                if (updatedMovie.hasOwnProperty("plot") && updatedMovie["plot"] === "") {
                    return "plot missing";
                }
                else if (updatedMovie.hasOwnProperty("plot") && typeof updatedMovie["plot"] !== "string") {
                    return " plot invalid";
                }
                if (updatedMovie.hasOwnProperty("rating") && typeof updatedMovie["rating"] !== "number") {
                    return " rating invalid";
                }
            }
            if (updatedMovie.hasOwnProperty("comments")) {
                delete updatedMovie["comments"];
                if (_.keys(updatedMovie).length === 0) {
                    return "comments cannot be updated";
                }
            }
            try {
                const oldMovie = yield this.getMoviesById(movieId);
                const moviesCollection = yield collection.default.moviesCollection();
                let that = this;
                return yield moviesCollection.updateOne({ _id: movieID }, { $set: updatedMovie })
                    .then(function (updateInfo) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (updateInfo.modifiedCount === 0) {
                            return "updated value same as before";
                        }
                        return yield that.getMoviesById(movieId);
                    });
                });
            }
            catch (e) {
                return e;
            }
        });
    }
    addComment(movieId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!comment.hasOwnProperty("name") || comment["name"] === "") {
                return "name missing";
            }
            else if (typeof comment["name"] !== "string") {
                return "invalid name";
            }
            if (!comment.hasOwnProperty("comment") || comment["comment"] === "") {
                return "comment missing";
            }
            else if (typeof comment["comment"] !== "string") {
                return "comment invalid";
            }
            let movieID = new mongodb_1.ObjectID();
            try {
                movieID = new mongodb_1.ObjectID(movieId);
            }
            catch (e) {
                return "error";
            }
            comment = new Comment_1.Comment(comment);
            try {
                yield this.getMoviesById(movieId);
                const moviesCollection = yield collection.default.moviesCollection();
                let that = this;
                return yield moviesCollection.updateOne({ _id: movieID }, { $push: { "comments": comment } })
                    .then(function (updateInfo) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (updateInfo.modifiedCount === 0) {
                            return "error";
                        }
                        return yield that.getMoviesById(movieId);
                    });
                });
            }
            catch (e) {
                return e;
            }
        });
    }
    deleteComment(movieId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let movieID = new mongodb_1.ObjectID();
            try {
                movieID = new mongodb_1.ObjectID(movieId);
            }
            catch (e) {
                return "error";
            }
            let commentID = new mongodb_1.ObjectID();
            try {
                commentID = new mongodb_1.ObjectID(commentId);
            }
            catch (e) {
                return "error";
            }
            try {
                let that = this;
                yield that.getMoviesById(movieId);
                const moviesCollection = yield collection.default.moviesCollection();
                return yield moviesCollection.updateOne({ _id: movieID }, { $pull: { "comments": { "_id": new mongodb_1.ObjectID(commentID) } } })
                    .then(function (updateInfo) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (updateInfo.modifiedCount === 0) {
                            return "error";
                        }
                        return yield that.getMoviesById(movieId);
                    });
                });
            }
            catch (e) {
                return "error";
            }
        });
    }
}
exports.default = new Movies();
