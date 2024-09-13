import { z } from 'zod'

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})
export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})
export const resetPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export type SignInFields = z.infer<typeof signInSchema>
export type SignUpFields = z.infer<typeof signUpSchema>
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>
