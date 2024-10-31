import { useCallback, useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'
import { onError } from '@/helpers/error'

export function useRefreshUser() {
	const { user, refreshUser } = useAuthenticationStore()
	const [isRefreshing, setIsRefreshing] = useState(false)
	const { notify } = useToast()

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true)
		try {
			await refreshUser()
			if (!user?.emailVerified) {
				notify({ type: 'error', message: DEFAULT_ERROR_MESSAGES.EMAIL_NOT_VERIFIED })
			}
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			setIsRefreshing(false)
		}
	}, [notify, refreshUser, user])

	return {
		handleRefresh,
		isRefreshing,
	}
}
