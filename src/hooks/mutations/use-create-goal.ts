import { useMutation } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { makeGoalService } from '@/services/goal.service'

import { BreathingExerciseFoundException } from '@/exceptions/breathing-exercise-not-found.exception'

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
	const { mutate, isPending } = useMutation({
		mutationFn: async (params: CreateGoalParams) => {
			const { breathingExerciseId, frequencyPerWeek } = params

			const breathingExercise =
				await services.breathingExercise.getById(breathingExerciseId)
			if (!breathingExercise) throw new BreathingExerciseFoundException()

			await services.goal.create({
				title: breathingExercise.title,
				roundsTotal: breathingExercise.roundsTotal,
				steps: breathingExercise.steps,
				frequencyPerWeek,
			})
		},
		onError: params.onError,
		onSuccess: params.onSuccess,
	})

	return { mutate, isPending }
}
