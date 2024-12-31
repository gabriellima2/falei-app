import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useNavigation } from '@/hooks/use-navigation'
import { useToast } from '@/hooks/use-toast'

import { ROUTES } from '@/constants/routes'

export function useSignOut() {
	const [isLoading, setIsLoading] = useState(false)
	const { signOut } = useAuthenticationStore()
	const { replace } = useNavigation()
	const { notify } = useToast()

	async function handleSignOut() {
		setIsLoading(true)
		try {
			await signOut()
			replace(ROUTES.AUTH.SIGN_IN)
		} catch (err) {
			notify({
				type: 'error',
				message: 'Não foi possível sair. Por favor, tente novamente',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		handleSignOut,
	}
}
