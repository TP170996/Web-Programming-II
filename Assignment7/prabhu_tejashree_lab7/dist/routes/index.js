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
exports.Routes = void 0;
const movies_1 = require("../data/movies");
class Routes {
    routes(app) {
        app.route("/api/movies/").get((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movies_1.default.getAllMovies(request.query.take ? `${request.query.take}` : "20", request.query.skip ? `${request.query.skip}` : "0");
                response.json(movies);
            }
            catch (e) {
                response.status(404).json({ error: "Movie not found " });
            }
        }));
        app.route("/api/movies/:id").get((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movies_1.default.getMoviesById(request.params.id);
                response.json(movie);
            }
            catch (e) {
                response.status(404).json({ error: "Movie not found " });
            }
        }));
        app.route("/api/movies/").post((request, response) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield movies_1.default.addMovie(request.body);
            response.status(201).json(movie);
        }));
        app.route("/api/movies/:id").put((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movies_1.default.updateMovie(`${request.params.id}`, request.body, false);
                response.json(movie);
            }
            catch (e) {
                response.status(201).json("error");
            }
        }));
        app.route("/api/movies/:id").patch((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movies_1.default.updateMovie(`${request.params.id}`, request.body, true);
                response.json(movie);
            }
            catch (e) {
                response.status(201).json("error");
            }
        }));
        app.route("/api/movies/:id/comments").post((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movies_1.default.addComment(`${request.params.id}`, request.body);
                response.json(movie);
            }
            catch (e) {
                response.status(201).json("error");
            }
        }));
        app.route("/api/movies/:movieId/:commentId").delete((request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield movies_1.default.deleteComment(`${request.params.movieId}`, `${request.params.commentId}`);
                response.json(movie);
            }
            catch (e) {
                response.status(201).json("error");
            }
        }));
    }
}
exports.Routes = Routes;
