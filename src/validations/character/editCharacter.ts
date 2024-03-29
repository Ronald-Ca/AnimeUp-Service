import { z } from 'zod';

export const editCharacterZod = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    age: z.number().optional(),
    height: z.string().optional(),
    gif: z.string().optional(),
    video: z.string().optional(),
    audio: z.string().optional(),
})