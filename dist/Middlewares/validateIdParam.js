import { idSchema } from "../Schemas/idSchema.js";
export const validateId = async (req, res, next) => {
    const { id } = req.params;
    idSchema.parse(id);
    next();
};
