import { z } from 'zod';

export const userAuthenticateZod = z.object({
    email: z.string(),
    password: z.string().min(6)
})