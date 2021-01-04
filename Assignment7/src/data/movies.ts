/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
import * as collection from ".././config/mongoCollection";
import {IMovie, Movie} from "./Movie";
import {IComment, Comment} from "./Comment";
import {ObjectID, ObjectId} from "mongodb";


const _ = require('underscore');


class Movies {   

    public async getMoviesById(movieId: string): Promise<any> {
        if (movieId === undefined || movieId === null) {

            return "Movie not found"
        }
        let movieID: ObjectId = new ObjectID()

        try {
            movieID = new ObjectID(movieId);
        } catch (e) {
            return "Movie not find"
            }
            
        

        const moviesCollection = await collection.default.moviesCollection();

        let Movie: IMovie = await moviesCollection.findOne({_id: movieID});

        if (Movie === null) {
            return "Movie not found"
            };
            
        

        return Movie;
    }


    public async getAllMovies(takeString: string , skipString: string ): Promise<any> {
       

        let take: number = parseInt(takeString);
        if (isNaN(take)) {
           
            return "take not a number"
        }

        let skip: number = parseInt(skipString);
        if (isNaN(skip)) {
            return "skip not a number"
        }

        take = take < 100 ? take : 100;

        if (take === 0) {
            return []
        }

        const moviesCollection = await collection.default.moviesCollection();

        return await moviesCollection.find().limit(take).skip(skip).toArray()
    }


    public async addMovie(newMovie: IMovie): Promise<any> {
        

        if (newMovie === undefined || _.isEmpty(newMovie)) {
            return "Movie Not defined";
            
        } else if (typeof newMovie !== "object") {
            return "Invalid Movie";
        }

        if (!newMovie.hasOwnProperty("title")|| newMovie["title"]===""|| newMovie["title"]===undefined|| newMovie["title"]===null) {
            return "title Missing"
        } else if (typeof newMovie["title"] !== "string" ) {
            return  "title not a string"
        }

        for (let i = 0; i < newMovie["cast"].length; i++) {
            if (!newMovie["cast"][i].hasOwnProperty("firstName") || newMovie["cast"][i]["firstName"]==="") {
                return " Missing FirstName"
            } else if (typeof newMovie["cast"][i]["firstName"] !== "string" ) {
                return "firstname not a string"
            }

            if (!newMovie["cast"][i].hasOwnProperty("lastName") || newMovie["cast"][i]["lastName"]==="") {
                return "lastName missing"
            } else if (typeof newMovie["cast"][i]["lastName"] !== "string") {
                return "lastName not a string"
            }            
        }


        

        if (!newMovie.info.hasOwnProperty("director") || newMovie.info.director === "") {
            return "director missing"
        } else if ( typeof newMovie.info.director !== "string" ) {
            return " director not a string"
        }
        if (!newMovie.info.hasOwnProperty("yearReleased")) {
            return "year released missing"
        } else if ( typeof newMovie.info.yearReleased !== "number" ) {
            return " yearReleased not a number"
        }

        if (!newMovie.hasOwnProperty("plot") || newMovie["plot"]==="") {
            return "plot missing"
        } else if (typeof newMovie["plot"] !== "string") {
            return "plot not string"
        }
        if (!newMovie.hasOwnProperty("rating")) {
            return "rating empty"
        } else if (typeof newMovie["rating"] !== "number" ) {
            return "rating not number"
        }

        if (!newMovie.hasOwnProperty("comments")) {
            newMovie["comments"] = []
        } else if (!Array.isArray(newMovie["comments"])) {
            return "invalid comments"
        }

        

        for (let i = 0; i < newMovie["comments"].length; i++) {
            if (!newMovie["comments"][i].hasOwnProperty("name")) {
                return " Missing Name";
            } else if (typeof newMovie["comments"][i]["name"] !== "string") {
                return "Invalid name "
            }

            if (!newMovie["comments"][i].hasOwnProperty("comment")) {
                return "comment missing"
            } else if (typeof newMovie["comments"][i]["comment"] !== "string") {
                return "Comment not a string"
            }

            newMovie["comments"][i] = new Comment(newMovie["comments"][i])
        }

         

        try {
            newMovie = new Movie(newMovie)
        } catch (e) {
            
            return "error"
        }

        const moviesCollection = await collection.default.moviesCollection();
        const insertInfo = await moviesCollection.insertOne(newMovie);

        if (insertInfo.insertedCount === 0) {
            
            return "Could not insert"
        }
        else {

        const newId = insertInfo.insertedId.toString();

        return await this.getMoviesById(newId);
        }
        
    
    }
   
    public async updateMovie(movieId: string, updatedMovie: IMovie, patchMovie: boolean ): Promise<any> {
        

        let movieID: ObjectId = new ObjectID();
        
        movieID = new ObjectID(movieId);
        try{
            movieID=== undefined        
        } catch (e) {
            return "movie not found"
        }

       
        
        if ( updatedMovie === undefined ||  _.isEmpty(updatedMovie)) {
            return "updated movie not found"
        } else if ( typeof updatedMovie !== "object") {
            return "invalid movie"
        }


        if (!patchMovie)
        {
        if ( !updatedMovie.hasOwnProperty("title") ||   updatedMovie["title"] === "" ) {
            return "missing title"
        } else if ( updatedMovie.hasOwnProperty("title") && typeof updatedMovie["title"] !== "string") {
            return "invalid title"
        }

        if ( !updatedMovie.hasOwnProperty("cast") ) {
            return "missing cast"
        }

        
        for (let i = 0; i < updatedMovie["cast"].length; i++) {
            if ( !updatedMovie["cast"][i].hasOwnProperty("firstName") ||  updatedMovie["cast"][i]["firstName"]==="") {
                return " Missing FirstName"
            } else if ( updatedMovie["cast"][i].hasOwnProperty("firstName") && typeof updatedMovie["cast"][i]["firstName"] !== "string" ) {
                return "firstname invalid"
            }

            if ( !updatedMovie["cast"][i].hasOwnProperty("lastName") || updatedMovie["cast"][i]["lastName"]==="") {
                return "lastName missing"
            } else if (  updatedMovie["cast"][i].hasOwnProperty("lastName") && typeof updatedMovie["cast"][i]["lastName"] !== "string") {
                return "lastName invalid"
            }          
        }
        
        if ( !updatedMovie.hasOwnProperty("info") ) {
            return "missing info"
        }
        

        if ( !updatedMovie.info.hasOwnProperty("director") || updatedMovie.info["director"] === "" ) {
           return "director missing"
        } else if ( updatedMovie.info.hasOwnProperty("director") && typeof updatedMovie.info["director"] !== "string") {
            return "director not valid"
        }

        if ( !updatedMovie.info.hasOwnProperty("yearReleased")  ) {
            return "year released missing"
         } else if ( updatedMovie.info.hasOwnProperty("yearReleased") && typeof updatedMovie.info["yearReleased"] !== "number") {
             return "year released not valid"
         }

        if ( !updatedMovie.hasOwnProperty("plot") ||  updatedMovie["plot"] === "" ) {
           return "plot missing"
        } else if ( updatedMovie.hasOwnProperty("plot") && typeof updatedMovie["plot"] !== "string") {
            return " plot invalid"
        }

        if ( !updatedMovie.hasOwnProperty("rating")) {
            return "rating missing"
         } else if ( updatedMovie.hasOwnProperty("rating") && typeof updatedMovie["rating"] !== "number") {
             return " rating invalid"
         }

        }

        else if (patchMovie)
        {
        if ( updatedMovie.hasOwnProperty("title") &&   updatedMovie["title"] === "" ) {
            return "missing title"
        } else if ( updatedMovie.hasOwnProperty("title") && typeof updatedMovie["title"] !== "string") {
            return "invalid title"
        }

        if(updatedMovie.hasOwnProperty("cast"))
        {
        for (let i = 0; i < updatedMovie["cast"].length; i++) {
            if ( !updatedMovie["cast"][i].hasOwnProperty("firstName") || updatedMovie["cast"][i]["firstName"]==="") {
                return " Missing FirstName"
            } else if (  typeof updatedMovie["cast"][i]["firstName"] !== "string" ) {
                return "firstname invalid"
            }

            if ( !updatedMovie["cast"][i].hasOwnProperty("lastName") || updatedMovie["cast"][i]["lastName"]==="") {
                return "lastName missing"
            } else if (   typeof updatedMovie["cast"][i]["lastName"] !== "string") {
                return "lastName invalid"
            }          
        }
    }

    if(updatedMovie.hasOwnProperty("info"))
    {

        if ( !updatedMovie.info.hasOwnProperty("director") || updatedMovie.info["director"] === "" ) {
           return "director missing"
        } else if (  typeof updatedMovie.info["director"] !== "string") {
            return "director not valid"
        }

         if ( !updatedMovie.info.hasOwnProperty("yearReleased") || typeof updatedMovie.info["yearReleased"] !== "number") {
             return "year released not valid"
         }
        }
        if ( updatedMovie.hasOwnProperty("plot") &&  updatedMovie["plot"] === "" ) {
           return "plot missing"
        } else if ( updatedMovie.hasOwnProperty("plot") && typeof updatedMovie["plot"] !== "string") {
            return " plot invalid"
        }

         if ( updatedMovie.hasOwnProperty("rating") && typeof updatedMovie["rating"] !== "number") {
             return " rating invalid"
         }

        }

        if (updatedMovie.hasOwnProperty("comments")) {
            delete updatedMovie["comments"];
            if (_.keys(updatedMovie).length === 0) {
                return "comments cannot be updated"
            }
        }
        
       
        try {
            const oldMovie: IMovie = await this.getMoviesById(movieId);

            const moviesCollection = await collection.default.moviesCollection();
            let that = this;

            return await moviesCollection.updateOne({_id: movieID}, {$set: updatedMovie})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        
                        return "updated value same as before"
                    }
                    return await that.getMoviesById(movieId);
                });
        } catch (e) {
            return e
        }
    }

    public async addComment(movieId: string, comment: IComment): Promise<any> {
        

        if (!comment.hasOwnProperty("name") || comment["name"] === "") {
            return "name missing"
        } else if (typeof comment["name"] !== "string") {
            return "invalid name"
        }

        if (!comment.hasOwnProperty("comment") || comment["comment"] === "") {
           return "comment missing"
        } else if (typeof comment["comment"] !== "string") {
            return "comment invalid"
        }

        let movieID: ObjectId = new ObjectID()

        try {
        movieID = new ObjectID(movieId);
        } catch (e) {
            
            return "error"
        }

        comment = new Comment(comment)

        

        try {
            await this.getMoviesById(movieId);

            const moviesCollection = await collection.default.moviesCollection();
            let that = this
            return await moviesCollection.updateOne({_id: movieID}, {$push: {"comments": comment}})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        
                        return "error"
                    }
                    return await that.getMoviesById(movieId);
                });
        } catch (e) {
            return e
        }
    }

    public async deleteComment(movieId: string, commentId: string): Promise<any> {
        

        let movieID: ObjectId = new ObjectID()

        try {
            movieID = new ObjectID(movieId);
        } catch (e) {
            
            return "error"
        }

        let commentID: ObjectId = new ObjectID()

        try {
            commentID = new ObjectID(commentId);
        } catch (e) {
           
            return "error"
        }

        try {
            let that = this

            await that.getMoviesById(movieId);

            const moviesCollection = await collection.default.moviesCollection();

            return await moviesCollection.updateOne({_id: movieID}, {$pull: {"comments": {"_id": new ObjectID(commentID)}}})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        
                        return "error"
                    }
                    return await that.getMoviesById(movieId)
                });
        } catch (e) {
            return "error"
        }
    }
}

export default new Movies()