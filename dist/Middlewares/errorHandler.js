export const errorHandler = (err, req, res, next) => {
    const message = err.message || "internal unkwon error";
    const code = 500;
    res.send({ error: message, code });
};
