import { z } from 'zod';

export const editSeasonZod = z.object({
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
    year: z.number().int().optional(),
    image: z.string().min(3).max(255).optional(),
    episodes: z.number().int().optional(),
    status: z.string().min(3).max(255).optional(),
    opinion: z.string().min(3).max(255).optional(),
})