import type { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    const message = err.message || "Unkwon Error";

    const code = 500;

    console.log(err);
    

    res.status(code).send(message);

};