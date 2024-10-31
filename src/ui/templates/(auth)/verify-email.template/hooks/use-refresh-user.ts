import { useCallback, useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import { onError } from '@/helpers/error'

export function useRefreshUser() {
	const { refreshUser } = useAuthenticationStore()
	const [isRefreshing, setIsRefreshing] = useState(false)
	const { notify } = useToast()

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true)
		try {
			const refreshedUser = await refreshUser()
			if (!refreshedUser?.emailVerified) {
				notify({
					type: 'error',
					message: 'Seu e-mail não foi verificado!',
					description: 'Por favor, verifique-o para continuar.',
				})
			}
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		} finally {
			setIsRefreshing(false)
		}
	}, [notify, refreshUser])

	return {
		handleRefresh,
		isRefreshing,
	}
}
