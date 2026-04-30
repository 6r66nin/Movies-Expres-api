import { AppError } from "../Classes/AppError.js";
import { ZodError } from "zod";
export const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ZodError) {
        const errors = err.issues.map((e) => {
            return { Path: e.path, Message: e.message };
        });
        res.status(400).json(errors);
        return;
    }
    const message = err.message || "Unkwon Error";
    const code = err instanceof AppError ? err.statusCode : 500;
    res.status(code).send(message);
};
