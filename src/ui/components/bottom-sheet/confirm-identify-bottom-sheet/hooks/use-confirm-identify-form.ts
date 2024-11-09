import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'

import { onError } from '@/helpers/error'
import {
	confirmIdentifySchema,
	type ConfirmIdentifyFields,
} from '@/schemas/authentication.schema'

type UseConfirmIdentifyFormParams = {
	onConfirm?: (params: ConfirmIdentifyFields) => unknown
}

export function useConfirmIdentifyForm(params: UseConfirmIdentifyFormParams) {
	const { onConfirm } = params
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<ConfirmIdentifyFields>({
		defaultValues,
		resolver: zodResolver(confirmIdentifySchema),
	})
	const { user, signIn } = useAuthenticationStore()
	const { notify } = useToast()

	function clearAll() {
		reset(defaultValues)
	}

	async function handleConfirm(params: ConfirmIdentifyFields) {
		try {
			if (!user) {
				notify({ type: 'error', message: DEFAULT_ERROR_MESSAGES.NO_USER_AUTHENTICATED })
				return
			}
			await signIn({ email: user.email, password: params.password })
			onConfirm && (await onConfirm(params))
			clearAll()
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		}
	}

	return {
		errors,
		isSubmitting,
		control,
		clearAll,
		onSubmit: handleSubmit(handleConfirm),
	}
}

const defaultValues: DefaultValues<ConfirmIdentifyFields> = {
	password: '',
}
