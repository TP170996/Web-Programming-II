/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const movies = data.movies;
const comments = data.comments;

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
       
        for(i=0;i<200;i++)
        {
            var x="Movie"+ i;
            var k = movies.addMovie(x, "Keanu","Reeves","Dean Parisot",2020,"Once told they'd save the universe during.",3);
        }    
                 
        
        return k;
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
    
}, (error) => {
    console.error(error,123123);
});