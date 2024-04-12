import { z } from 'zod';

export const createAnimeZod = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    image: z.string().url(),
    episodes: z.number().int().positive(),
    rating: z.number(),
    publicRating: z.number().optional(),
    year: z.number().int().positive(),
    status: z.string(),
    trailer: z.string().url().optional(),
    opinion: z.string().optional(),
})