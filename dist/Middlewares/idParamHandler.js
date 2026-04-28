import { idSchema } from "../Schemas/idSchema.js";
export const validateMovie = async (req, res, next) => {
    idSchema.parse(req.params.id);
    next();
};
