import { useMutation } from '@tanstack/react-query'

import { useAuthenticationStore } from '@/store/authentication-store'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { makeGoalService } from '@/services/goal.service'

import { BreathingExerciseNotFoundException } from '@/exceptions/breathing-exercise-not-found.exception'
import { UnauthenticatedUserException } from '@/exceptions/unauthenticated-user.exception'

const services = {
	goal: makeGoalService(),
	breathingExercise: makeBreathingExerciseService(),
}

export type CreateGoalParams = {
		breathingExerciseId: string
		frequencyPerWeek: number
	}

export function useCreateGoalMutation(
	params: MutationParams
): MutationReturn<CreateGoalParams> {
	const user = useAuthenticationStore((store) => store.user)

	const { mutate, isPending } = useMutation({
		mutationFn: async (params: CreateGoalParams) => {
			if (!user) throw new UnauthenticatedUserException()
			const { breathingExerciseId, frequencyPerWeek } = params

			const breathingExercise =
				await services.breathingExercise.getById(breathingExerciseId)
			if (!breathingExercise) throw new BreathingExerciseNotFoundException()

			await services.goal.create({
				title: breathingExercise.title,
				roundsTotal: breathingExercise.roundsTotal,
				steps: breathingExercise.steps,
				frequencyPerWeek,
				userId: user.id
			})
		},
		onError: params.onError,
		onSuccess: params.onSuccess,
	})

	return { mutate, isPending }
}
