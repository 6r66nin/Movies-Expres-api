import Express from "express";
import { router } from "./Routes/movieRoutes.js";
import { errorHandler } from "./Middlewares/errorHandler.js";
import { urlNotFound } from "./Controller/notFoundController.js";
const app = Express();
const PORT = process.env.PORT || 3000;
app.use(Express.json());
app.use("/movies", router);
app.use(urlNotFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("Server Working on", PORT);
});
