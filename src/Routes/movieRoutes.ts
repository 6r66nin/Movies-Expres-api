import { Router } from "express";
import {
  validateMovie,
  validatePartialMovie,
} from "../Middlewares/validateMovie.js";
import { validateId } from "../Middlewares/validateIdParam.js";
import * as Controller from "../Controller/moviesController.js";

export const router = Router();

router
  .route("/")
  .get(Controller.getMovies)
  .post(validateMovie, Controller.addMovie);

router.use("/:id", validateId);

router
  .route("/:id")
  .get(Controller.getMovie)
  .patch(validatePartialMovie, Controller.updateMovie)
  .delete(Controller.addMovie);
