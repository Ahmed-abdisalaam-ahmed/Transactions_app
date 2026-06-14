import {z} from 'zod'

export const createTransactionSchema = z.object({
    title: z.string().min(4, "Title is Required!"),
    amount: z.number().min(0, "Type the amount of the Price!"),
    type: z.enum(["income", "expense"]).optional(),
    category: z.string().optional(),
    description: z.string().optional()
})