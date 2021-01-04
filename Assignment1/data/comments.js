/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const mongoCollections = require("../config/mongoCollection");
const uuid = require('node-uuid');
const moviesModule = require("./movies");
const movies = mongoCollections.movies;


let exportedMethods = {

    getAllCommentsByMovieId(Mid) {
       return moviesModule.getMoviesById(Mid).then((movie)=>{
           let comments = movie.comments;
           let commentsFormat = [];

            for (var index = 0; index < movie.comments.length; index++) {
                let commentTmp = {
                    _id: comments[index]._id, 
                    movieId: movie._id, 
                    name: comments[index].name,
                    comment: comments[index].comment                    
                };
                commentsFormat.push(commentTmp);
                
            }
            return commentsFormat;
       });
    },

    getCommentById(id){
        return movies().then((moviesCollection) => {            
            return moviesCollection
                .findOne({"comments": { $elemMatch: { "_id": id } }})
                .then((movie) => {
                    if (!movie){
                        throw "comment not found";
                    } 
                    for (var index = 0; index < movie.comments.length; index++) {
                        if(movie.comments[index]._id == id){
                            var comment = movie.comments[index];
                        }
                    }
                    let commentFormat = {
                        _id: comment._id, 
                        movieId: movie._id, 
                        name: comment.name, 
                        comment: comment.comment
                    }

                    return commentFormat;
                });
        }); 
    },

    addComment(Mid,name,comment) {
        return movies().then((moviesCollection)=>{
            if(name === undefined || name == ""){
                throw "name is needed";
            }
            if (typeof name !== "string") {
                throw "name must be string";
            } 
            if(comment === undefined){
                throw "comment is needed";
            }
            if (typeof comment !== "string") {
                throw "comment must be string";
            }   
            
            var cid = uuid.v4();
            let newComment = {
                _id: cid,
                name: name,
                comment: comment
            };

            return moviesCollection
                .update({ _id: Mid }, { $push: { "comments": newComment } }).then((result) => {
                 return this.getCommentById(cid).then((rtn)=>{
                    return rtn;
                });        
            });
        });
    },

    updateComment(comment, updatedComment) {
        return movies().then((moviesCollection) => {
            let updatedCommentData = {};

            updatedComment._id = comment._id;

            if (updatedComment.name) {
                updatedCommentData.name = updatedComment.name;
            }

            if (updatedComment.comment) {
                updatedCommentData.comment = updatedComment.comment;
            }

            var commentParam = {
                "_id": comment._id,
                "name": comment.name,
                "comment": comment.comment, 
            };

            return moviesCollection
                .update({ _id: comment.movieId }, { $pull: { "comments": commentParam } })
                .then((result) => {  
                   return moviesCollection.update({ _id: comment.movieId }, { $push: { "comments": updatedComment } })
                   .then(()=>{});
                }).catch(()=>{
                    throw(`Could not delete comment with id of ${comment._id}`)
                });
        });
    },  

    removeComment(movieId,comment) {
        return movies().then((moviesCollection) => {
            var commentParam = {
                "_id": comment._id,
                "name": comment.name, 
                "comment": comment.comment 
            };
            return moviesCollection
                .update({ _id: movieId }, { $pull: { "comments": commentParam } })
                .then((result) => {  
                   return result;
                }).catch(()=>{
                    throw(`Could not delete comment with id of ${comment._id}`)
                });
        });
    }
}

module.exports = exportedMethods;