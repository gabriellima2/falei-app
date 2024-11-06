import { z } from 'zod'

import { VALIDATION_RULES, VALIDATION_MESSAGES } from '@/validations/constants'
import { isValidPassword } from '@/validations/utils'

export const signInSchema = z.object({
	email: z
		.string({
			required_error: VALIDATION_MESSAGES.REQUIRED,
		})
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_EMAIL, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_EMAIL,
		})
		.email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
	password: z
		.string({ required_error: VALIDATION_MESSAGES.REQUIRED })
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_PASSWORD, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_PASSWORD,
		})
		.refine((password) => isValidPassword(password), {
			message: VALIDATION_MESSAGES.MIN_LENGTH_PASSWORD,
		}),
})

export const signUpSchema = z.object({
	email: z
		.string({
			required_error: VALIDATION_MESSAGES.REQUIRED,
		})
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_EMAIL, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_EMAIL,
		})
		.email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
	password: z
		.string({ required_error: VALIDATION_MESSAGES.REQUIRED })
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_PASSWORD, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_PASSWORD,
		})
		.refine((password) => isValidPassword(password), {
			message: VALIDATION_MESSAGES.MIN_LENGTH_PASSWORD,
		}),
})

export const resetPasswordSchema = z.object({
	email: z
		.string({
			required_error: VALIDATION_MESSAGES.REQUIRED,
		})
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_EMAIL, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_EMAIL,
		})
		.email({ message: VALIDATION_MESSAGES.INVALID_EMAIL }),
})

export const updatePasswordSchema = z.object({
	password: z
		.string({ required_error: VALIDATION_MESSAGES.REQUIRED_PASSWORD_TO_EDIT })
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED_PASSWORD_TO_EDIT })
		.max(VALIDATION_RULES.MAX_LENGTH_PASSWORD, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_PASSWORD,
		})
		.refine((password) => isValidPassword(password), {
			message: VALIDATION_MESSAGES.MIN_LENGTH_PASSWORD,
		}),
})

export const confirmIdentifySchema = z.object({
	password: z
		.string({ required_error: VALIDATION_MESSAGES.REQUIRED })
		.min(1, { message: VALIDATION_MESSAGES.REQUIRED })
		.max(VALIDATION_RULES.MAX_LENGTH_PASSWORD, {
			message: VALIDATION_MESSAGES.MAX_LENGTH_PASSWORD,
		})
		.refine((password) => isValidPassword(password), {
			message: VALIDATION_MESSAGES.MIN_LENGTH_PASSWORD,
		}),
})

export type SignInFields = z.infer<typeof signInSchema>
export type SignUpFields = z.infer<typeof signUpSchema>
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>
export type UpdatePasswordFields = z.infer<typeof updatePasswordSchema>
export type ConfirmIdentifyFields = z.infer<typeof confirmIdentifySchema>
