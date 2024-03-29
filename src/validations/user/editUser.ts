import { z } from 'zod';

export const userEditZod = z.object({
    name: z.string().optional(),
    nickname: z.string().optional(),
})