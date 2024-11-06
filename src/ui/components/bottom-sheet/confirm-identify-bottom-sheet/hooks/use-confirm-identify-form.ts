import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
		formState: { isSubmitting, errors },
	} = useForm<ConfirmIdentifyFields>({
		defaultValues,
		resolver: zodResolver(confirmIdentifySchema),
	})

	async function handleConfirm(params: ConfirmIdentifyFields) {
		onConfirm && (await onConfirm(params))
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
