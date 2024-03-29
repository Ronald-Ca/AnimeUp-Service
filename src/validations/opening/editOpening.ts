import { z } from 'zod';

export const editOpeningZod = z.object({
    title: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
    animeId: z.string(),
});