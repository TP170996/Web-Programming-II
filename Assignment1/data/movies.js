/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const mongoCollection = require("../config/mongoCollection");
const movies = mongoCollection.movies;
const uuid = require('node-uuid');

let exportedMethods = {

    
    getAllMovies(skip, take) {
        return movies().then((moviesCollection) => {
            return moviesCollection
                .find({})
                .skip(skip)
                .limit(take)
                .toArray();
        }); 
    },

    getMoviesById(id){
        return movies().then((moviesCollection)=> {
            return moviesCollection
            .findOne({_id:id})
            .then((movie) => {
                
                if(!movie)
                  throw "Movie not found";
                return movie;
                
            });
        });
    },

    addMovie(title,firstName,lastName,director,yearReleased,plot,rating) {

        if(title == undefined || title == ""){
            throw "Enter Title";            
        }else if (typeof title !== "string"){
            throw "title must be string";
        }        
        if(firstName == undefined ){
            throw "Enter firstName";            
        }else if (typeof firstName !== "string"){
            throw "firstName must be string";
        }        
        if(lastName == undefined ){
            throw "Enter lastName";            
        }else if (typeof lastName !== "string"){
            throw "lastName must be string";
        }
        if(director == undefined){
            throw "Enter director";            
        }else if (typeof title !== "string"){
            throw "director must be string";
        }
        if(yearReleased == undefined){
            throw "Enter yearReleased";            
        }else if (typeof yearReleased !== "number"){
            throw "YearReleased must be Number3";
        }
        if(plot == undefined){
            throw "Enter plot";            
        }else if (typeof plot !== "string"){
            throw "plot must be string";
        }
        rating = parseInt(rating);
        if(rating == undefined){
            throw "Enter Title";            
        }else if (typeof rating !== "number"){
            throw "rating must be number";
        }
        
        comments = [];

        return movies().then((moviesCollection) => {
            let newMovie ={
                _id: uuid.v4(),
                title: title,
                cast: [{firstName: firstName, lastName: lastName}],
                info: {director: director, yearReleased: yearReleased},  
                plot: plot,
                rating: rating,
                comments: comments
            };

            return moviesCollection
            .insertOne(newMovie)
            .then((newInsertInformation) =>{
                return newInsertInformation.insertedId;
            })
            .then((newId) => {

                return this.getMoviesById(newId);
            });
        });

    },

    updateMovie(id,title,firstName,lastName,director,yearReleased,plot,rating){
        return movies().then((moviesCollection) => {
            let updatedMoviesData = {};
            
            if(title == undefined){
                throw "Enter Title";            
            }else if (typeof title !== "string"){
                throw "title must be string";
            }
            if(firstName == undefined){
                throw "Enter firstName";            
            }else if (typeof firstName !== "string"){
                throw "firstName must be string";
            }
            if(lastName == undefined){
                throw "Enter lastName";            
            }else if (typeof lastName !== "string"){
                throw "lastName must be string";
            }
            if(director == undefined){
                throw "Enter director";            
            }else if (typeof title !== "string"){
                throw "director must be string";
            }
            if(yearReleased == undefined){
                throw "Enter yearReleased";            
            }else if (typeof yearReleased !== "number"){
                throw "YearReleased must be Number2";
            }
            if(plot == undefined){
                throw "Enter plot";            
            }else if (typeof plot !== "string"){
                throw "plot must be string";
            }
            rating = parseInt(rating);
            if(rating == undefined){
                throw "Enter Title";            
            }else if (typeof rating !== "number"){
                throw "rating must be number";
            }
            

            updatedMoviesData ={
                "title": title,
                "cast": [{firstName: firstName, lastName: lastName}],
                "info": {director: director, yearReleased: yearReleased},  
                "plot": plot,
                "rating": rating,
            }
            let updateCommand ={
                $set:updatedMoviesData
            }

            return moviesCollection.updateOne({
                _id:id
            }, updateCommand).then((result) =>{
                return this.getMoviesById(id);
            });
        });
    },

    patchMovie(id, updatedMoviesData) {
        return movies().then((moviesCollection) => {
        
            if(updatedMoviesData.title == undefined){
                if (typeof updatedMoviesData.title !== "string"){
                  throw "title must be string";
            }}

            if(updatedMoviesData.cast[0].firstName == undefined){
                if (typeof updatedMoviesData.cast[0].firstName !== "string"){
                  throw "firstName must be string";
            }}
            if(updatedMoviesData.cast[0].lastName == undefined){
                if (typeof updatedMoviesData.cast[0].lastName !== "string"){
                  throw "lastName must be string";
            }}
            if(updatedMoviesData.director == undefined){
                if (typeof updatedMoviesData.title !== "string"){
                  throw "director must be string";
            }}
            
            if(updatedMoviesData.yearReleased == undefined){
                
                  throw "YearReleased must be Number1";
            }           
            if(updatedMoviesData.plot == undefined){
                if (typeof updatedMoviesData.plot !== "string"){
                  throw "plot must be string";
            }}
            rating = parseInt(rating);
            if(updatedMoviesData.rating == undefined){
                if (typeof updatedMoviesData.rating !== "number"){
                  throw "rating must be number";
            }}
            
            let updateCommand = {
                $set: updatedMoviesData
            };

            return moviesCollection.updateOne({
                _id:id
            }, updateCommand).then((result)=>{
                return this.getMoviesById(id);
            });

        });
    }
}

module.exports = exportedMethods;