import { useMutation } from '@tanstack/react-query'
import { makeGoalService } from '@/services/goal.service'

const service = makeGoalService()

export function useDeleteGoalMutation(
	params: MutationParams,
): MutationReturn<string> {
	const { mutate, isPending } = useMutation({
		mutationFn: (goalId: string) => service.delete(goalId),
		onError: params.onError,
		onSuccess: params.onSuccess,
	})

	return { mutate, isPending }
}
