import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { BreathingExerciseMenu } from '../../components/breathing-exercise-menu'
import { BreathingExercisesContext } from './breathing-exercises.context'
import { CreateGoal } from '../../components/create-goal'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function BreathingExercisesProvider(props: PropsWithChildren) {
	const createGoalBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const breathingExerciseMenuBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [breathingExerciseId, setBreathingExerciseId] = useState<string | null>(null)

	const handleOpenBreathingExerciseMenu = useCallback((id: string | null) => {
		breathingExerciseMenuBottomSheetRef.current?.present()
		setBreathingExerciseId(id)
	}, [])


	const handleOpenCreateGoal = useCallback(() => {
		createGoalBottomSheetRef.current?.present()
	}, [])

	return (
		<BreathingExercisesContext.Provider
			value={{
				breathingExerciseId,

				breathingExerciseMenuBottomSheetRef,
				createGoalBottomSheetRef,

				handleOpenBreathingExerciseMenu,
				handleOpenCreateGoal,
			}}
		>
			<CreateGoal />
			<BreathingExerciseMenu />
			{props.children}
		</BreathingExercisesContext.Provider>
	)
}
