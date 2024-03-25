import { z } from 'zod';

export const createAnimeZod = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    episodes: z.number(),
    rating: z.number(),
    publicRating: z.number().optional(),
    year: z.number(),
    status: z.string(),
    trailer: z.string().optional(),
    opinion: z.string().optional(),
})