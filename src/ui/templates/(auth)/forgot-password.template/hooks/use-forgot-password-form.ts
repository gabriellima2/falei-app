import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useResetPasswordViaEmail } from '@/hooks/use-reset-password-via-email'

import { resetPasswordSchema, type ResetPasswordFields } from '@/schemas/authentication.schema'

export function useForgotPasswordForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFields>({
		defaultValues,
		resolver: zodResolver(resetPasswordSchema),
	})
	const { sendResetPasswordEmail, isSending, ...rest } = useResetPasswordViaEmail()

	return {
		...rest,

		errors,
		isSubmitting: isSending,
		control,
		onSubmit: handleSubmit(sendResetPasswordEmail),
	}
}

const defaultValues: DefaultValues<ResetPasswordFields> = {
	email: '',
}
