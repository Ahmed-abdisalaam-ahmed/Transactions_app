import { z } from "zod";

export const createUserschema = z.object({
    name: z.string().min(1, "name is Required"),
    email: z.string().email("Email must be valid"),
    password: z.string()
                .min(6, "Password must be a 6 characters")
                .max(100, "Password must ba at most 100 characters ")
})