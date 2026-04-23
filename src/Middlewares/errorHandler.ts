import type { Request, Response, NextFunction } from "express";


export const errorHandler = (err: Error, req: Request, res:  Response, next: NextFunction) => {

    const message = err.message || "internal unkwon error";
    const code = 500;

    res.send({error: message, code});
}