import { z } from 'zod';

export const editCategoryZod = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
})