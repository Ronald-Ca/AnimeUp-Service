import { z } from 'zod';

export const createCategoryZod = z.object({
    name: z.string(),
    description: z.string(),
});