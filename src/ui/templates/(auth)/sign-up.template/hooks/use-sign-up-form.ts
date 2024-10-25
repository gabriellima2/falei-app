import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { useAuthenticationStore } from '@/store/authentication-store'
import { useNavigation } from '@/hooks/use-navigation'
import { useToast } from '@/hooks/use-toast'

import { ROUTES } from '@/constants/routes'
import {
	signUpSchema,
	type SignUpFields,
} from '@/schemas/authentication.schema'
import { onError } from '@/helpers/error'

export function useSignUpForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignUpFields>({
		resolver: zodResolver(signUpSchema),
	})
	const { signUp } = useAuthenticationStore()
	const navigation = useNavigation()
	const toast = useToast()

	async function handleLogin(credentials: SignUpFields) {
		try {
			await signUp(credentials)
			navigation.replace(ROUTES.HOME)
		} catch (err) {
			const message = onError(err)
			toast.notify({
				type: 'error',
				message: message,
			})
		}
	}

	useEffect(() => {
		register('email')
		register('password')
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleLogin),
	}
}
