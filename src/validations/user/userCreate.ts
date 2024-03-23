import { z } from 'zod';

export const userCreateZod = z.object({
    email: z.string().email(),
    name: z.string(),
    nickname: z.string().optional(),
    password: z.string().min(6)
})