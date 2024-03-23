import { z } from 'zod';

export const userEditZod = z.object({
    name: z.string(),
    nickname: z.string().optional(),
})