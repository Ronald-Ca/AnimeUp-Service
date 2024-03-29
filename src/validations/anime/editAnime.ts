import { z } from 'zod';

export const editAnimeZod = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    episodes: z.number().optional(),
    rating: z.number().optional(),
    publicRating: z.number().optional(),
    year: z.number().optional(),
    status: z.string().optional(),
    trailer: z.string().optional(),
    opinion: z.string().optional(),
})