import { z } from 'zod';

export const validIdZod = z.object({
    id: z.string()
})