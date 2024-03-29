import { z } from 'zod';

export const createCharacterZod = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    age: z.number().optional(),
    height: z.string().optional(),
    gif: z.string().optional(),
    video: z.string().optional(),
    audio: z.string().optional(),
});