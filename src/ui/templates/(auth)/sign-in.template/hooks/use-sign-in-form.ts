import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useNavigation } from '@/hooks/use-navigation'
import { useToast } from '@/hooks/use-toast'

import {
	signInSchema,
	type SignInFields,
} from '@/schemas/authentication.schema'

import { ROUTES } from '@/constants/routes'
import { onError } from '@/helpers/error'

export function useSignInForm() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<SignInFields>({
		defaultValues,
		resolver: zodResolver(signInSchema),
	})
	const { signIn } = useAuthenticationStore()
	const { replace } = useNavigation()
	const toast = useToast()

	async function handleSignIn(credentials: SignInFields) {
		try {
			await signIn(credentials)
			reset(defaultValues)
			replace(ROUTES.EXERCISE_COMPLETED)
		} catch (err) {
			const message = onError(err)
			toast.notify({
				type: 'error',
				message,
			})
		}
	}

	return {
		errors,
		isSubmitting,
		control,
		onSubmit: handleSubmit(handleSignIn),
	}
}

const defaultValues: DefaultValues<SignInFields> = {
	email: '',
	password: '',
}
