import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import {
	signUpSchema,
	type SignUpFields,
} from '@/schemas/authentication.schema'
import { onError } from '@/helpers/error'

export function useSignUpForm() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<SignUpFields>({
		defaultValues,
		resolver: zodResolver(signUpSchema),
	})
	const { signUp } = useAuthenticationStore()
	const toast = useToast()

	async function handleSignUp(credentials: SignUpFields) {
		try {
			await signUp(credentials)
			reset(defaultValues)
			toast.notify({
				type: 'success',
				message: 'Sua conta foi criada com sucesso!',
			})
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
		onSubmit: handleSubmit(handleSignUp),
	}
}

const defaultValues: DefaultValues<SignUpFields> = {
	email: '',
	password: '',
}
