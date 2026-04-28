export const errorHandler = (err, req, res, next) => {
    const message = err.message || "Unkwon Error";
    const code = 500;
    console.log(err);
    res.status(code).send(message);
};
