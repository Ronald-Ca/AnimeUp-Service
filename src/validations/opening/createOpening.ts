import { z } from 'zod';

export const createOpeningZod = z.object({
    title: z.string(),
    audio: z.string(),
    video: z.string(),
    animeId: z.string(),
});