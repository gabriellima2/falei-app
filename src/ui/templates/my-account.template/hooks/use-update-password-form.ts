import { useForm, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useBottomSheetControl } from '@/hooks/use-bottom-sheet-control'
import { useAuthenticationStore } from '@/store/authentication-store'
import { useToast } from '@/hooks/use-toast'

import {
	updatePasswordSchema,
	type UpdatePasswordFields,
} from '@/schemas/authentication.schema'

export function useUpdatePasswordForm() {
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
	const confirmIdentifyBottomSheet = useBottomSheetControl()
	const { notify } = useToast()

	function handleUpdate() {
		confirmIdentifyBottomSheet.handleOpen()
	}

	async function updatePassword() {
		const password = getValues('password')
		const parsedPassword = updatePasswordSchema.safeParse({ password })
		if (!parsedPassword.success) {
			throw new Error(parsedPassword.error.message)
		}
		await updatePasswordAuth({ password })
		notify({ type: 'success', message: 'Senha alterada com sucesso!' })
		confirmIdentifyBottomSheet.handleClose()
		reset(defaultValues)
	}

	return {
		updatePassword,
		confirmIdentifyBottomSheet,

		errors,
		control,
		onSubmit: handleSubmit(handleUpdate),
	}
}

const defaultValues: DefaultValues<UpdatePasswordFields> = {
	password: '',
}
