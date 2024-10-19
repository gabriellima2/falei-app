import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useBreathingExercisesContext } from '../../../contexts/breathing-exercises.context/hooks'

import { makeBreathingExerciseService } from '@/services/breathing-exercise.service'
import { makeGoalService } from '@/services/goal.service'

import { BreathingExerciseFoundException } from '@/exceptions/breathing-exercise-not-found.exception'
import { QUERY_KEYS } from '@/constants/keys'

type CreateGoalFields = {
	breathingExerciseId: string
	frequencyPerWeek: number
}

const services = {
	goal: makeGoalService(),
	breathingExercise: makeBreathingExerciseService()
}

export function useCreateGoal() {
	const queryClient = useQueryClient()
	const [isCreating, setIsCreating] = useState(false)
	const { createGoalBottomSheetRef } = useBreathingExercisesContext()

	const handleCreate = useCallback(
		async (params: CreateGoalFields) => {
			setIsCreating(true)
			try {
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
				await queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.GET_PENDING_GOALS],
				})
				createGoalBottomSheetRef?.current?.close()
			} catch (err) {
				console.log(err)
			} finally {
				setIsCreating(false)
			}
		},
		[queryClient, createGoalBottomSheetRef],
	)

	return { isCreating, handleCreate }
}
