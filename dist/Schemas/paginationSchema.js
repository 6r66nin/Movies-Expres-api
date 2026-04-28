import z from "zod";
export const paginationSchema = z.object({
    page: z.coerce.number().int().min(0).default(1),
    filter: z.union([z.string(), z.array(z.string())])
}).partial();
