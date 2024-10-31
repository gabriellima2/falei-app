import { useState } from 'react'
import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useCountdown } from '@/hooks/use-countdown'
import { useToast } from '@/hooks/use-toast'

import { resetPasswordSchema, type ResetPasswordFields } from '@/schemas/authentication.schema'
import { onError } from '@/helpers/error'

export function useForgotPasswordForm() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<ResetPasswordFields>({
		defaultValues,
		resolver: zodResolver(resetPasswordSchema),
	})
	const [timeRemainingToSendAgain, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 120,
	})
	const [alreadySentFirstTime, setAlreadySentFirstTime] = useState(false)
	const { resetPassword } = useAuthenticationStore()
	const { notify } = useToast()

	const isNotTimeToSendAgainOver =
		timeRemainingToSendAgain > 0 && alreadySentFirstTime

	async function handleSend(credentials: ResetPasswordFields) {
		if (isNotTimeToSendAgainOver) return
		resetCountdown()
		try {
			await resetPassword(credentials)
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			startCountdown()
			setAlreadySentFirstTime(true)
		}
	}

	return {
		alreadySentFirstTime,
		timeRemainingToSendAgain,
		isNotTimeToSendAgainOver,

		errors,
		isSubmitting,
		control,
		onSubmit: handleSubmit(handleSend),
	}
}

const defaultValues: DefaultValues<ResetPasswordFields> = {
	email: '',
}
