import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useCountdown } from '@/hooks/use-countdown'
import { useToast } from './use-toast'

import { onError } from '@/helpers/error'
import type { ResetPasswordFields } from '@/schemas/authentication.schema'

export function useResetPasswordViaEmail() {
	const [timeRemainingToSendAgain, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 120,
	})
	const [alreadySentFirstTime, setAlreadySentFirstTime] = useState(false)
	const [isSending, setIsSending] = useState(false)
	const { resetPassword } = useAuthenticationStore()
	const { notify } = useToast()

	const isNotTimeToSendAgainOver =
		timeRemainingToSendAgain > 0 && alreadySentFirstTime

	async function sendResetPasswordEmail(credentials: ResetPasswordFields) {
		if (isNotTimeToSendAgainOver) return
		resetCountdown()
		setIsSending(true)
		try {
			await resetPassword(credentials)
			notify({ type: 'success', message: "Email enviado com sucesso!" })
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			startCountdown()
			setAlreadySentFirstTime(true)
			setIsSending(false)
		}
	}

	return {
		sendResetPasswordEmail,

		isSending,
		alreadySentFirstTime,
		timeRemainingToSendAgain,
		isNotTimeToSendAgainOver,
	}
}
