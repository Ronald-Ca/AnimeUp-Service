import { z } from 'zod';

export const createSeasonZod = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    year: z.number().int(),
    image: z.string().min(3).max(255),
    episodes: z.number().int(),
    status: z.string().min(3).max(255).optional(),
    opinion: z.string().min(3).max(255).optional(),
})