import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import {
	updatePasswordSchema,
	type UpdatePasswordFields,
} from '@/schemas/authentication.schema'

type UseUpdatePasswordFormParams = {
	onSubmit: () => unknown
	onSuccess?: () => unknown
}

export function useUpdatePasswordForm(params: UseUpdatePasswordFormParams) {
	const { onSubmit, onSuccess } = params
	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<UpdatePasswordFields>({
		defaultValues,
		resolver: zodResolver(updatePasswordSchema),
	})
	const { updatePassword: updatePasswordAuth } = useAuthenticationStore()
	const { notify } = useToast()

	async function updatePassword() {
		const password = getValues('password')
		const parsedPassword = updatePasswordSchema.safeParse({ password })
		if (!parsedPassword.success) {
			throw new Error(parsedPassword.error.message)
		}
		await updatePasswordAuth({ password })
		notify({ type: 'success', message: 'Senha alterada com sucesso!' })
		onSuccess && (await onSuccess())
		reset(defaultValues)
	}

	return {
		updatePassword,
		errors,
		control,
		onSubmit: handleSubmit(onSubmit),
	}
}

const defaultValues: DefaultValues<UpdatePasswordFields> = {
	password: '',
}
