import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/use-toast'

import {
	confirmIdentifySchema,
	type ConfirmIdentifyFields,
} from '@/schemas/authentication.schema'
import { onError } from '@/helpers/error'

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
	const { notify } = useToast()

	async function handleConfirm(params: ConfirmIdentifyFields) {
		try {
			onConfirm && (await onConfirm(params))
			reset(defaultValues)
		} catch (err) {
			const message = onError(err)
			notify({ type: 'error', message })
		}
	}

	return {
		errors,
		isSubmitting,
		control,
		onSubmit: handleSubmit(handleConfirm),
	}
}

const defaultValues: DefaultValues<ConfirmIdentifyFields> = {
	password: '',
}
