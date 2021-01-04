/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
import {Request, Response} from 'express';
import Movies from "../data/movies";

export class Routes{
    public routes(app): void {
        app.route("/api/movies/").get(async (request: Request, response: Response) => {
            try {
                const movies = await Movies.getAllMovies(request.query.take ? `${request.query.take}` : "20",
                    request.query.skip ? `${request.query.skip}` : "0");
                response.json(movies);
            } catch (e) {
                response.status(404).json({ error: "Movie not found " });
            }
         });

         app.route("/api/movies/:id").get(async(request: Request, response: Response) => {
            try{
            const movie= await Movies.getMoviesById(request.params.id);
            response.json(movie);
            }catch(e) {
                response.status(404).json({ error: "Movie not found " });
            }
            
        });

        app.route("/api/movies/").post(async (request: Request, response: Response) => {
           
                const movie = await Movies.addMovie(request.body);
                response.status(201).json(movie);
           
        });

        app.route("/api/movies/:id").put(async (request: Request, response: Response) => {
            try {
                const movie = await Movies.updateMovie(`${request.params.id}`, request.body, false);
                response.json(movie);
            } catch (e) {
                
                response.status(201).json("error")
            }
        });

        app.route("/api/movies/:id").patch(async (request: Request, response: Response) => {
            try {
                const movie = await Movies.updateMovie(`${request.params.id}`, request.body, true);
                response.json(movie);
            } catch (e) {
                
                response.status(201).json("error")
            }
        });

        app.route("/api/movies/:id/comments").post(async (request: Request, response: Response) => {
            try {
                const movie = await Movies.addComment(`${request.params.id}`, request.body);
                response.json(movie);
            } catch (e) {
                
                response.status(201).json("error")
            }
        });

        app.route("/api/movies/:movieId/:commentId").delete(async (request: Request, response: Response) => {
            try {
                const movie = await Movies.deleteComment(`${request.params.movieId}`, `${request.params.commentId}`);
                response.json(movie);
            } catch (e) {
                
                response.status(201).json("error")
            }
        });
    }
            }


