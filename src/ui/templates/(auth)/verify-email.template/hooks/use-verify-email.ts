import { useCallback, useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import { onError } from '@/helpers/error'

export function useVerifyEmail() {
	const { emailVerification, refreshUser } = useAuthenticationStore()
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [isResending, setIsResending] = useState(false)
	const { notify } = useToast()

	const handleResendEmailVerification = useCallback(async () => {
		setIsResending(true)
		try {
			await emailVerification()
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			setIsResending(false)
		}
	}, [notify, emailVerification])

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true)
		try {
			await refreshUser()
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			setIsRefreshing(false)
		}
	}, [notify, refreshUser])

	return {
		isResending,
		handleResendEmailVerification,

		handleRefresh,
		isRefreshing,
	}
}
