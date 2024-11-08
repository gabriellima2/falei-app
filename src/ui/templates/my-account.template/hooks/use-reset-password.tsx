import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useCountdown } from '@/hooks/use-countdown'
import { useToast } from '@/hooks/use-toast'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'
import { onError } from '@/helpers/error'

export function useResetPassword() {
	const [timeRemainingToSendAgain, { startCountdown, resetCountdown }] =
		useCountdown({
			countStart: 120,
		})
	const [alreadySentFirstTime, setAlreadySentFirstTime] = useState(false)
	const [isSending, setIsSending] = useState(false)
	const { user, resetPassword } = useAuthenticationStore()
	const { notify } = useToast()

	const isNotTimeToSendAgainOver =
		timeRemainingToSendAgain > 0 && alreadySentFirstTime

	async function sendResetPasswordEmail() {
		if (isNotTimeToSendAgainOver) return
		resetCountdown()
		setIsSending(true)
		try {
			if (!user) {
				notify({ type: 'error', message: DEFAULT_ERROR_MESSAGES.NO_USER_AUTHENTICATED })
				return
			}
			await resetPassword({ email: user.email })
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
		isSending,

		alreadySentFirstTime,
		timeRemainingToSendAgain,
		isNotTimeToSendAgainOver,

		sendResetPasswordEmail,
	}
}
