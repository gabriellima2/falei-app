import { useMutation } from '@tanstack/react-query'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { makeGoalService } from '@/services/goal.service'

import { BreathingExerciseFoundException } from '@/exceptions/breathing-exercise-not-found.exception'

const services = {
	goal: makeGoalService(),
	breathingExercise: makeBreathingExerciseService(),
}

export type CreateBreathingExerciseGoalParams = {
	breathingExerciseId: string
	frequencyPerWeek: number
}

export function useCreateBreathingExerciseGoalMutation(
	params: MutationParams
): MutationReturn<CreateBreathingExerciseGoalParams> {
	const { mutate, isPending } = useMutation({
		mutationFn: async (params: CreateBreathingExerciseGoalParams) => {
			const { breathingExerciseId, frequencyPerWeek } = params

			const breathingExercise =
				await services.breathingExercise.getById(breathingExerciseId)
			if (!breathingExercise) throw new BreathingExerciseFoundException()

			await services.goal.create({
				title: breathingExercise.title,
				frequency_per_week: frequencyPerWeek,
				rounds_total: breathingExercise.roundsTotal,
				steps: breathingExercise.steps,
			})
		},
		onError: params.onError,
		onSuccess: params.onSuccess
	})

	return { mutate, isPending }
}
