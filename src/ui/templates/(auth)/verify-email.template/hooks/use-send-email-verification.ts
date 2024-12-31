import { useEffect, useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useCountdown } from '@/hooks/use-countdown'
import { useToast } from '@/hooks/use-toast'

import { onError } from '@/helpers/error'

export function useSendEmailVerification() {
	const [timeRemainingToSendAgain, { startCountdown, resetCountdown }] = useCountdown({
		countStart: 120,
	})
	const { emailVerification } = useAuthenticationStore()
	const [isSending, setIsSending] = useState(false)
	const { notify } = useToast()

	const isNotTimeToSendAgainOver = timeRemainingToSendAgain > 0

	async function sendEmailVerification() {
		setIsSending(true)
		resetCountdown()
		try {
			await emailVerification()
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			setIsSending(false)
			startCountdown()
		}
	}

	function handleSend() {
		if (isNotTimeToSendAgainOver) return
		sendEmailVerification()
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		sendEmailVerification()
	}, [])

	return {
		timeRemainingToSendAgain,
		isNotTimeToSendAgainOver,

		isSending,
		handleSend,
	}
}
