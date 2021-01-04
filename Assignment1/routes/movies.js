/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const express = require("express");
const router = express.Router();
const data = require("../data");
const moviesData = data.movies;
const commentsData = data.comments;


router.get("/", (req, res) => {
    var skip = req.query.skip;
    var take = req.query.take;
    
    if(skip == undefined || skip < 0){
        skip = 0;
    }
    if(take == undefined || take < 0){
        take = 20;
    }else if(take>100){
        take = 100;
    }
    skip = parseInt(skip);
    take = parseInt(take);

    moviesData.getAllMovies(skip, take).then((moviesList) => {
        res.status(200).json(moviesList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.get("/:id", (req, res) => {
    moviesData.getMoviesById(req.params.id).then((movie) => {
        res.json(movie);
    }).catch(() => {
        res.status(404).json({ error: "Movie not found " });
    });
});

router.post("/", (req, res) => {
    let moviePostData = req.body;
       
    
    moviesData.addMovie(moviePostData.title, moviePostData.cast[0].firstName, moviePostData.cast[0].lastName, moviePostData.info.director, moviePostData.info.yearReleased, moviePostData.plot, moviePostData.rating )
        .then((newMovie) => {
            res.json(newMovie);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let moviePostData = req.body;
    let getMovies = moviesData.getMoviesById(req.params.id);

    getMovies.then(() => {
        return moviesData.updateMovie(req.params.id, moviePostData.title,moviePostData.cast[0].firstName, moviePostData.cast[0].lastName, moviePostData.info.director, moviePostData.info.yearReleased, moviePostData.plot, moviePostData.rating)
            .then((updatedMovies) => {
                res.json(updatedMovies);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch((e) => {
        res.status(404).json({ error: e });
    });

});

router.patch("/:id", (req, res) => {
    let moviePostData = req.body;
    let getMovies = moviesData.getMoviesById(req.params.id);

    getMovies.then(() => {
        return moviesData.patchMovie(req.params.id, moviePostData)
            .then((updatedMovies) => {
                res.json(updatedMovies);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch((e) => {
        res.status(404).json({ error: e });
    });

});

router.post("/:id/comments", (req, res) => {
    let commentPostData = req.body;

    commentsData.addComment(req.params.id, commentPostData.name, commentPostData.comment)
        .then((newComment) => {
            res.json(newComment);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.delete("/:taskId/:commentId", (req, res) => {
    let getComment = commentsData.getCommentById(req.params.commentId);

    getComment.then((comment) => {
        return commentsData.removeComment(req.params.taskId,comment)
            .then(() => {
                res.status(200).json({"result":"ok"});
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found" });
    });
});


module.exports = router;